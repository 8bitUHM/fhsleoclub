import { StrictMode, useEffect } from "react";
import { initFlowbite } from "flowbite";
import { createRoot } from "react-dom/client";

import "../index.css";


export function ForgotPassword() {
    useEffect(() => {
        initFlowbite();
    }, []);


    return(
        <h1>Hello World</h1>
    );
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ForgotPassword />
    </StrictMode>
);