import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AddMember from "../components/AddMember";
import "../index.css";

export function Add() {
    return (
        <>
            <AddMember />
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Add />
    </StrictMode>
);
