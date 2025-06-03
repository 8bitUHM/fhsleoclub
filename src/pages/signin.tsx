import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SignInForm from "../components/SigninForm";
import "../index.css";

export function SignIn() {

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
