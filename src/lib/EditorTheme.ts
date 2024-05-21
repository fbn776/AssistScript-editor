import {createTheme} from "@uiw/codemirror-themes";
import {tags as t} from '@lezer/highlight';

export const editorTheme = createTheme({
    theme: 'dark',
    settings: {
        background: '#1E1E1E',
        caret: '#b3b3b3',
        selection: '#8c8c8c20',
        selectionMatch: '#036dd626',
        lineHighlight: '#31313177',
        gutterBackground: '#262626',
        gutterForeground: '#8a9199',
    },
    styles: [
        { tag: t.keyword, color: '#bb9af7' },
        { tag: [t.name, t.deleted, t.character, t.macroName], color: '#c0caf5' },
        { tag: [t.propertyName], color: '#7aa2f7' },
        { tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)], color: '#9ece6a' },
        { tag: [t.function(t.variableName), t.labelName], color: '#7aa2f7' },
        { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: '#bb9af7' },
        { tag: [t.definition(t.name), t.separator], color: '#c0caf5' },
        { tag: [t.className], color: '#c0caf5' },
        { tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: '#ff9e64' },
        { tag: [t.typeName], color: '#0db9d7' },
        { tag: [t.operator, t.operatorKeyword], color: '#bb9af7' },
        { tag: [t.url, t.escape, t.regexp, t.link], color: '#b4f9f8' },
        { tag: [t.meta, t.comment], color: '#444b6a' },
        { tag: t.strong, fontWeight: 'bold' },
        { tag: t.emphasis, fontStyle: 'italic' },
        { tag: t.link, textDecoration: 'underline' },
        { tag: t.heading, fontWeight: 'bold', color: '#89ddff' },
        { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#c0caf5' },
        { tag: t.invalid, color: '#ff5370' },
        { tag: t.strikethrough, textDecoration: 'line-through' },
    ],
});