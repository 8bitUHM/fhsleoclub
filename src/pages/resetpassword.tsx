import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import Reset from "../components/Reset";
import "../index.css";

export function ResetPassword() {
    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <>
            <Reset />
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ResetPassword />
    </StrictMode>
);
