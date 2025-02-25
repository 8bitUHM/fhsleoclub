import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../index.css";

export function Contact() {
    useEffect(() => {
        initFlowbite();
    }, []);

    return(
        <>
            <Navbar />

            <h1>This is the Contact Page</h1>

            <Footer />
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Contact />
    </StrictMode>
)