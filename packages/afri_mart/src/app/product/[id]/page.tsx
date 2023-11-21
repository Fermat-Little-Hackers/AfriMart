"use client"

import { usePathname } from "next/navigation";

export default function Home() {

    const id = usePathname()

    return(
        <div>
            <p>How far now {id} </p>
        </div>
    )
}