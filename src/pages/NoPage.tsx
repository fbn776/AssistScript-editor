import {Link} from "react-router-dom";
import {IconHome} from "@tabler/icons-react";

export function NoPage() {
    return <main className='fixed inset-0 bg-[#313131] flex flex-col items-center justify-center gap-2'>
        <h1 className='text-7xl font-extrabold relative animate-bounce'>
            <span className='absolute inset-0 translate-x-0.5 translate-y-0.5 text-red-500 z-[-1]'>404</span>
            <span className='absolute inset-0 translate-x-1 translate-y-1 text-blue-400 z-[-2]'>404</span>
            <span className='absolute inset-0 translate-x-1.5 translate-y-1.5 text-run z-[-3]'>404</span>
            404
        </h1>
        <h2>Page Not Found</h2>
        <Link to='/' className='flex gap-2 text-blue-400'>
            <IconHome size={20}/>
            Go Home
        </Link>
    </main>
}