import CodeMirror from "@uiw/react-codemirror";
import {editorTheme} from "../lib/EditorTheme.ts";
import Output from "./Output.tsx";
import {useEffect, useRef, useState} from "react";


function Editor({isMobile}: { isMobile: boolean }) {
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('');
    const codeValue = useRef<string>('');

    useEffect(() => {
        async function loadCode(e: CustomEvent) {
            setLoading(true);
            const response = await fetch(e.detail);

            if (!response.ok) {
                console.error('Failed to load code');
                setLoading(false);
                alert('Failed to load code');
                return;
            }

            const data = await response.text();
            codeValue.current = data;
            setCode(data);
            setLoading(false);
        }

        // @ts-ignore
        window.addEventListener('load-code', loadCode);

        return () => {
            // @ts-ignore
            window.removeEventListener('load-code', loadCode);
        }
    }, []);

    return <div
        className="absolute w-full h-[calc(100%-60px)] max-h-[calc(100%-60px)] flex gap-3 p-3 max-sm:flex-col"
    >
        <div
            className="bg-[#313131] p-3 rounded flex flex-col gap-1 flex-1 max-w-[50%] max-sm:max-w-[100%] max-sm:h-[50%] max-sm:max-h-[50%]">
            <h2 className="text-lg flex gap-2">
                Code Editor
                {loading ?
                    <svg className="loader" viewBox="25 25 50 50">
                        <circle r="20" cy="50" cx="50"></circle>
                    </svg> :
                    ''
                }
            </h2>
            <CodeMirror className="max-h-full flex-grow" placeholder="Code here..." minHeight="100%"
                        maxHeight={isMobile ? "100px" : "500px"} maxWidth="100%" theme={editorTheme}
                        onChange={(value) => {
                            codeValue.current = value;
                        }}
                        value={code}
            />
        </div>
        <Output code={codeValue}/>
    </div>;
}

export default Editor;