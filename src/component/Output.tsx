import {MutableRefObject, useEffect, useState} from "react";
import {IconEraser} from "@tabler/icons-react";
import runCode from "../lib/runner.ts";

const runEndEvent = new Event('run-end');

function Output({code}: { code: MutableRefObject<string> }) {
    const [outputs, setOutputs] = useState<{ buffer: unknown[], isError: boolean } | null>(null);

    useEffect(() => {
        async function handleRun() {
            if (code.current)
                setOutputs(runCode(code.current))
            else
                setOutputs(null);

            // Simulate a delay
            await new Promise(r => setTimeout(r, 800));
            window.dispatchEvent(runEndEvent);
        }

        window.addEventListener('run', handleRun);

        return () => window.removeEventListener('run', handleRun);
    }, []);

    return <div className="bg-[#313131] p-3 gap-1 rounded flex flex-col max-h-[calc(100%-60px)] min-h-[100%] max-w-[50%] flex-1">
        <div className="flex justify-between">
            <h2 className="text-lg">Output</h2>
            <IconEraser className="cursor-pointer hover:text-red-500" onClick={() => setOutputs(null)}/>
        </div>
        <div className="w-full flex-grow bg-[#1E1E1E] text-white p-3 rounded overflow-y-auto overflow-x-auto">
            {
                (outputs === null || (outputs?.buffer.length === 0)) ?
                    <p className="text-center text-gray-400">Output is empty</p> :
                    outputs.buffer.map((item, index) =>
                        <pre key={index}
                             className={`text-sm ${outputs.isError ? 'text-red-500' : ''}`}>
                            {item as string}
                        </pre>
                    )
            }
        </div>
    </div>;
}

export default Output;