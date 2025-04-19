import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import Update from "../components/Update";
import "../index.css";

export function SignIn() {
    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <>
            <Update />
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Update />
    </StrictMode>
);
