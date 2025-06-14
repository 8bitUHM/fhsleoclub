import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AddUser from "../components/AddUser";
import "../index.css";

export function Add() {
    return (
        <>
            <AddUser />
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AddUser />
    </StrictMode>
);
