import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Update from "../components/Update";
import "../index.css";

export function SignIn() {

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
