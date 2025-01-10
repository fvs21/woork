"use client";

import { useState } from "react";
import { DashboardOptionContext } from ".";

export default function DashboardContext({children}) {
    const [option, setOption] = useState<number>(-1);

    return (
        <DashboardOptionContext.Provider value={[option, setOption]}>
            {children}
        </DashboardOptionContext.Provider>
    )
}