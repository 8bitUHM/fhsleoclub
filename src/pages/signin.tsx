import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";

import "../index.css";
import Login from "../components/login";

export function SignIn() {
    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <>
            <Login />
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SignIn />
    </StrictMode>
);
