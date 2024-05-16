import {IconPlayerPlay} from "@tabler/icons-react";

import CodeMirror from '@uiw/react-codemirror';


function App() {

    return (
        <>
            <header className="w-full h-[60px] bg-[#313131] flex items-center gap-3 px-3 justify-between">
                <div className="flex items-center gap-3">
                    <img src="/AS.png" alt="AssistScript logo" width='38px'
                         className='border-2 border-white border-opacity-10 rounded'/>
                    <h1 className='text-2xl'>AssistScript Runner</h1>
                </div>
                <button
                    className="flex items-center rounded border-2 px-2 py-1 border-run text-run hover:bg-run hover:text-white transition-colors">
                    Run
                    <IconPlayerPlay/>
                </button>
            </header>
            <div className="absolute w-full h-[calc(100%-60px)]">
                <div className="h-full grid grid-cols-2 max-md:grid-cols-1 gap-3 p-3 max-h-full">
                    <div className="bg-[#313131] p-3 rounded flex flex-col max-h-full">
                        <h2 className="text-lg">Code Editor</h2>
                        <CodeMirror className="max-h-full flex-grow" placeholder="Code here..." minHeight="100%" maxHeight="100%" theme="dark"/>
                    </div>
                    <div className="bg-[#313131] p-3 rounded">
                        <h2 className="text-lg">Output</h2>
                        <textarea className="w-full h-[400px] bg-[#1E1E1E] text-white p-3 rounded outline-none"/>
                    </div>
                </div>
            </div>
        </>
    )
}


export default App;
