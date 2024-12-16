import { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GuestRoute({children}) {
    const navigate = useNavigate();

    useEffect(() => {
        let user = undefined;
        if(user !== undefined) {
            navigate("/dashboard");
        }
    }, []);

    return children;
}