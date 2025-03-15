import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Social from "../components/Social";

import "../index.css";

export function Contact() {
    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <>
            <Navbar />
            <Header />
            <Social />
            <Footer />
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Contact />
    </StrictMode>
)