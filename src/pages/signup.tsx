import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SignupForm from "../components/SignupForm";
import "../index.css";


export function SignUp() {

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
