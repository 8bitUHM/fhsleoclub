import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import SignupForm from "../components/SignupForm";
import "../index.css";


export function SignUp() {
    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <>
            <SignupForm />
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SignUp />
    </StrictMode>
);
