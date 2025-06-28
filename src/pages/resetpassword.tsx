import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Reset from "../components/Reset";
import "../index.css";

export function ResetPassword() {
    
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
