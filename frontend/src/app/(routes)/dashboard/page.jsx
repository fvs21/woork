"use client";

import { useUser } from "@/api/hooks/user";

export default function Dashboard() {
    const user = useUser();

    return (
        <div>
            Dashboard<br/>
            User: {user.firstName}
        </div>
    )
}