import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DeleteUser from "../components/DeleteUser";
import "../index.css";

export function Delete() {
    return (
        <>
            <DeleteUser />
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <DeleteUser />
    </StrictMode>
);
