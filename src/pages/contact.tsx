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
            {/* Socials Section */}
            <section className="bg-red-900 pt-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center">Stay updated with us on:</h2>
                <Social />
            </section>

            {/* Student Section */}
            <section className="py-4">
                <h2 className="text-3xl md:text-4xl font-bold text-red-900 p-4 text-center break-words">For questions or collaboration, contact Leo Club at farringtonhighschoolleoclub@gmail.com</h2>
                <h2 className="text-3xl md:text-4xl font-bold text-red-900 p-4 text-center">To sign-up for Leo Club, Fill out the form below</h2>
                <div className="w-full">
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSd8sFRwdVTedWxaBa1aNjEWApPxMRx54vtvvnZvteWaB3IGtQ/viewform?embedded=true"
                        className="w-full h-[34rem] md:h-[70rem] p-4">
                    </iframe>
                </div>
            </section>

            {/* Staff, Parents, Others section */}
            <section className="bg-red-900 py-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white p-4 text-center break-words">For questions or collaboration, contact Leo Club at farringtonhighschoolleoclub@gmail.com</h2>
            </section>
            <Footer />
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Contact />
    </StrictMode>
)