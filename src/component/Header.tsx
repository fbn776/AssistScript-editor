import {IconCode, IconHelp, IconPlayerPlay} from "@tabler/icons-react";
import {useEffect, useRef, useState} from "react";
import samples from "../data/samples.ts";

/** A custom event to trigger the run event, this is dispatched when the run button is clicked */
const runEvent = new Event('run');
const openHelpEvent = new Event('open-help');

export function Header() {
    const [disabled, setDisabled] = useState(false);
    const menuRef = useRef<HTMLMenuElement>(null);

    useEffect(() => {
        const handleDisabled = () => {
            setDisabled(false);
        }
        window.addEventListener('run-end', handleDisabled);

        const runCode = (e: KeyboardEvent) => {
            const key = e.key;

            if (key === 'F5' || (e.ctrlKey && key === 'R')) {
                e.preventDefault();
                setDisabled(true);
                window.dispatchEvent(runEvent)
            }
        }

        document.addEventListener("keydown", runCode);

        return () => {
            window.removeEventListener('run-end', handleDisabled);
            document.removeEventListener("keydown", runCode);
        };
    }, []);

    return <header className="w-full h-[60px] bg-[#313131] flex items-center gap-3 px-3 justify-between">
        <div className="flex items-center gap-3">
            <img src="/AS.png" alt="AssistScript logo" width="38px"
                 className="border-2 border-white border-opacity-10 rounded"/>
            <h1 className="text-2xl">
                <span className="max-sm:hidden">AssistScript</span> Runner
            </h1>
        </div>
        <div className="flex items-center gap-4">
            <div className="relative flex">
                <button className="hover-tip" data-tip="Samples" onClick={() => {
                    menuRef.current?.classList.toggle('hidden');
                }}>
                    <IconCode size={30} className="stroke-[1.5px] hover:scale-110"/>
                </button>
                <menu
                    ref={menuRef}
                    className="hidden absolute overflow-y-auto overflow-x-hidden text-ellipsis w-[200px] divide-y-2 divide-white divide-opacity-10 h-fit max-h-[200px] top-[45px] left-[calc(50%-100px)] border-2 border-white border-opacity-10 rounded-md shadow-2xl z-[9999999999] bg-[#313131] "
                >
                    {
                        samples.map((sample, index) =>
                            <button key={index}
                                    className="w-full p-2 text-left hover:bg-run hover:text-white transition-colors text-sm text-nowrap text-ellipsis overflow-hidden whitespace-nowrap"
                                    onClick={() => {
                                        menuRef.current?.classList.add('hidden');
                                        const myEvent = new CustomEvent("load-code", {
                                            detail: sample.src,
                                            bubbles: true,
                                            cancelable: true,
                                            composed: false,
                                        });

                                        window.dispatchEvent(myEvent);
                                    }}
                            >
                                {sample.name}
                            </button>
                        )
                    }
                </menu>
            </div>
            <button className="hover-tip" data-tip="Help" onClick={() => window.dispatchEvent(openHelpEvent)}>
                <IconHelp size={30} className="stroke-[1.5px] hover:scale-110"/>
            </button>
            <button
                className="hover-tip flex items-center rounded border-2 px-2 py-1 border-run text-run hover:bg-run hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-run"
                onClick={() => {
                    setDisabled(true);
                    window.dispatchEvent(runEvent)
                }}
                disabled={disabled}
                data-tip="F5"
            >
                Run
                {disabled ? <svg className="loader" viewBox="25 25 50 50">
                    <circle r="20" cy="50" cx="50"></circle>
                </svg> : <IconPlayerPlay/>}
            </button>
        </div>
    </header>;
}