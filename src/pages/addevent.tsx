import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import "../index.css";
import AddEvent from "../components/AddEvent";

export function Add() {
    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <>
            <AddEvent />
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Add />
    </StrictMode>
);
