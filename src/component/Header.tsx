import {IconPlayerPlay} from "@tabler/icons-react";
import {useEffect, useState} from "react";

/** A custom event to trigger the run event, this is dispatched when the run button is clicked */
const runEvent = new Event('run');


export function Header() {
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        const handleDisabled = () => {
            setDisabled(false);
        }

        window.addEventListener('run-end', handleDisabled);

        return () => window.removeEventListener('run-end', handleDisabled);
    }, []);

    return <header className="w-full h-[60px] bg-[#313131] flex items-center gap-3 px-3 justify-between">
        <div className="flex items-center gap-3">
            <img src="/AS.png" alt="AssistScript logo" width="38px"
                 className="border-2 border-white border-opacity-10 rounded"/>
            <h1 className="text-2xl">AssistScript Runner</h1>
        </div>
        <button
            className="flex items-center rounded border-2 px-2 py-1 border-run text-run hover:bg-run hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-run"
            onClick={() => {
                setDisabled(true);
                window.dispatchEvent(runEvent)
            }}
            disabled={disabled}
        >
            Run
            {disabled ? <svg className="loader" viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
            </svg> : <IconPlayerPlay/>}
        </button>
    </header>;
}