import {Header} from "./component/Header.tsx";
import Editor from "./component/Editor.tsx";
import "./app.css"
import {useEffect, useState} from "react";
import Help from "./component/Help.tsx";

function App() {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        }

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <>
            <Header/>
            <Editor isMobile={isMobile}/>
            <Help/>
        </>
    )
}

export default App;
