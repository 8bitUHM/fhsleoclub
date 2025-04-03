import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import SignInForm from "../components/SigninForm";
import "../index.css";

export function SignIn() {
    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <>
            <SignInForm />
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SignIn />
    </StrictMode>
);
