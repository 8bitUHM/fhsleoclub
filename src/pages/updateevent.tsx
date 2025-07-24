import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import UpdateEvent from "../components/UpdateEvent";
import "../index.css";

export function SignIn() {
    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <>
            <UpdateEvent />
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <UpdateEvent />
    </StrictMode>
);
