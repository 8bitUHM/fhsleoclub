import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import AddMember from "../components/AddMember";
import "../index.css";

export function Add() {
    useEffect(() => {
        initFlowbite();
    }, []);

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
