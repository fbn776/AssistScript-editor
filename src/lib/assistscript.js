const commands = /^(test|print|help|execute|and|or|not|TRUE|FALSE|lt|lte|gt|gte|equals|neq|add|sub|mult|div|mod|abs|round|ceil|floor|truncate|min|max|clamp|sign|pow|sqrt|factorial|gcd|lcm|log2|log10|ln|sin|cos|tan|asin|acos|atan|atan2|sinh|cosh|tanh|asinh|acosh|atanh|deg|rad|random|randomInt|randomBool|randomChar|pi|E|sqrt2|ln2|ln10|log2e|log10e|break|continue|while|repeat|for|if|if-else|ife|else|set|get|delete|incr|decr|array|get-arr|index|setarr|length|delete-arr|append|pop|insert)$/;
const numLiteral = /^(?:[+\-]?(?:\d+|\d*\.\d+))/;
const symbol = /[^\s'`,@()\[\]";]/;
let type;

function readSym(stream) {
    let ch;
    while (ch = stream.next()) {
        if (ch === "\\") stream.next();
        else if (!symbol.test(ch)) {
            stream.backUp(1);
            break;
        }
    }
    return stream.current();
}

function base(stream, state) {
    if (stream.eatSpace()) {
        type = "ws";
        return null;
    }
    if (stream.match(numLiteral)) return "number";
    let ch = stream.next();
    if (ch === "\\") ch = stream.next();

    if (ch === '"') return (state.tokenize = inString)(stream, state);
    else if (ch === "(" || ch === "{") {
        type = "open";
        return "bracket";
    } else if (ch === ")" || ch === "}") {
        type = "close";
        return "bracket";
    } else if (/['`,@]/.test(ch)) return null;
    else {
        const name = readSym(stream);
        if (commands.test(name)) return "keyword";
        return "variableName";
    }
}

function inString(stream, state) {
    let escaped = false, next;
    while (next = stream.next()) {
        if (next === '"' && !escaped) {
            state.tokenize = base;
            break;
        }
        escaped = !escaped && next === "\\";
    }
    return "string";
}

export const assistscript = {
    name: "assistscript",
    startState: function () {
        return {ctx: {prev: null, start: 0, indentTo: 0}, lastType: null, tokenize: base};
    },

    token: function (stream, state) {
        if (stream.sol() && typeof state.ctx.indentTo != "number")
            state.ctx.indentTo = state.ctx.start + 1;

        type = null;
        const style = state.tokenize(stream, state);
        if (type !== "ws") {
            if (state.ctx.indentTo == null) {
                state.ctx.indentTo = "next";
            } else if (state.ctx.indentTo === "next") {
                state.ctx.indentTo = stream.column();
            }
            state.lastType = type;
        }
        if (type === "open") state.ctx = {prev: state.ctx, start: stream.column(), indentTo: null};
        else if (type === "close") state.ctx = state.ctx.prev || state.ctx;
        return style;
    },

    indent: function (state) {
        const i = state.ctx.indentTo;
        return typeof i == "number" ? i : state.ctx.start + 1;
    },

    languageData: {
        commentTokens: {line: ";;", block: {open: "#|", close: "|#"}},
        closeBrackets: {brackets: ["(", "{", '"']}
    }
};
