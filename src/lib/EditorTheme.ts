import {createTheme} from "@uiw/codemirror-themes";

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
    styles: [],
});