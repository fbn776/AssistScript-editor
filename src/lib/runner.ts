import {AssistScript, BaseContextProvider, ASErrors} from 'assistscript';
class CtxProvider extends BaseContextProvider {
    buffer: unknown[] = [];

    stdout = {
        print: (...str: unknown[]) => {
            this.buffer.push(str.join(' '));
        }
    }

    resetBuffer = () => {
        this.buffer = [];
    }
}

const ctx = new CtxProvider();
const runner = new AssistScript(ctx);

function runCode(str: string): { buffer: unknown[], isError: boolean } {
    ctx.resetBuffer();
    let isError = false;

    try {
        let result = runner.run(str);
        ctx.buffer.push(result);
    } catch (e) {
        isError = true;

        if (e instanceof ASErrors.ASBaseError)
            ctx.buffer.push(e.prettify());
        else if (e instanceof Error)
            ctx.buffer.push(e.message);
        else
            ctx.buffer.push(e);
    }

    let buffer = ctx.buffer;
    // Filter out any undefined, null or empty strings
    buffer = buffer.filter((v) => v !== undefined && v !== null && v !== '');
    return {buffer, isError};
}

export default runCode;