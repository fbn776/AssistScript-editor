import {IconBook, IconBrandGithub, IconBrandNpm, IconCode, IconX} from "@tabler/icons-react";
import {useEffect, useRef} from "react";

export default function Help() {
    const elem = useRef<HTMLElement>(null);

    useEffect(() => {
        const openHelp = () => {
            elem.current?.classList.toggle('hidden');
        };

        window.addEventListener('open-help', openHelp)

        return () => {
            window.removeEventListener('open-help', openHelp);
        }
    }, []);

    return <section className="hidden fixed z-[9999999999] inset-0 bg-[#323232]" ref={elem}>
        <div className="w-full h-[60px] bg-[#212121] flex justify-between px-4 items-center">
            <h1 className="text-2xl">AssistScript <span className="max-sm:hidden">Runner</span></h1>
            <button onClick={() => elem.current?.classList.toggle('hidden')}>
                <IconX size={30} className="stroke-[2px] hover:scale-110 hover:text-red-500"/>
            </button>
        </div>

        <div className="p-4 text-gray-400 overflow-auto fixed top-[60px] bottom-0">
            <h2 className="text-xl text-white mt-2 mb-1">Help</h2>
            <p>
                AssistScript is a a fun little project of mine. It's a programming language inspired by <a
                href="https://en.wikipedia.org/wiki/Lisp_(programming_language)"
                className="text-blue-400">Lisp.</a><br/><br/>
            </p>
            <p>
                Initially started I wanted to build an Assistant like app, and wanted a simple language to interact with
                it.
            </p>
            <p>
                So I built a very rough version of the language, and then I thought it would be fun to build it as a
                separate project.<br/><br/>
            </p>
            <p>
                This is an online runner for the language. You can write code in the editor and run it.
            </p>
            <hr className="opacity-20 my-3"/>

            <h2 className="text-xl text-white mt-2 mb-1">Samples</h2>
            <p>
                You can load sample code from the samples menu. Click on <span className='quote'><IconCode
                className='inline' size='20px'/></span>to
                open the samples menu.
            </p>
            <hr className="opacity-20 my-3"/>


            <h2 className="text-xl text-white mt-2 mb-1">Keyboard Shortcuts</h2>
            <ul className="text-gray-400">
                <li>Run: <kbd className='quote'>F5</kbd> or <kbd className='quote'>Ctrl</kbd>+<kbd
                    className='quote'>R</kbd></li>
            </ul>
            <hr className="opacity-20 my-3"/>

            <h2 className="text-xl text-white mt-2 mb-1">
                Links
            </h2>
            <ul className="text-blue-400">
                <li>
                    <a className="flex gap-2" href="https://github.com/fbn776/AssistScript"><IconBrandGithub size='20px'/> AssistScript</a>
                </li>
                <li>
                    <a className="flex gap-2" href="https://github.com/fbn776/AssistScript-editor"><IconBrandGithub size='20px'/> AssistScript
                        runner</a>
                </li>
                <li>
                    <a className="flex gap-2" href="https://npmjs.com/package/assistscript"><IconBrandNpm size='20px'/>Install</a>
                </li>
                <li>
                    <a className="flex gap-2" href="https://github.com/fbn776/AssistScript/blob/master/README.md"><IconBook size='20px'/>Docs</a>
                </li>
            </ul>

            <hr className="opacity-20 my-3"/>

            <div className="text-sm mt-2 mb-1">
                Made with 💙 by <a href="https://febinnelson.me" className='underline underline-offset-4'>fbn776</a>
            </div>
        </div>

    </section>
}