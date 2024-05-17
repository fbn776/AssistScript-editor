import CodeMirror from "@uiw/react-codemirror";
import {editorTheme} from "../lib/EditorTheme.ts";
import Output from "./Output.tsx";
import {useRef} from "react";


function Editor({isMobile}: {isMobile: boolean}) {
    const codeValue = useRef<string>('');

    return <div
        className="absolute w-full h-[calc(100%-60px)] max-h-[calc(100%-60px)] flex gap-3 p-3 max-sm:flex-col"
    >
        <div className="bg-[#313131] p-3 rounded flex flex-col gap-1 flex-1 max-w-[50%] max-sm:max-w-[100%] max-sm:h-[50%] max-sm:max-h-[50%]">
            <h2 className="text-lg">Code Editor</h2>
            <CodeMirror className="max-h-full flex-grow" placeholder="Code here..." minHeight="100%"
                        maxHeight={isMobile ? "100px" : "500px"} maxWidth="100%" theme={editorTheme}
                        onChange={(value) => {
                            codeValue.current = value;
                        }}
            />
        </div>
        <Output code={codeValue}/>
    </div>;
}

export default Editor;