import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Social from "../components/Social";
import { AuthContextProvider } from "../contexts/AuthContext";
import "../index.css";

export function Contact() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <AuthContextProvider>
                    <Navbar />
                </AuthContextProvider>
                <Header />
                <main className="flex-grow">
                    {/* Socials Section */}
                    <section className="bg-red-900 p-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-white text-center p-4">Stay updated with us on:</h2>
                        <Social />
                    </section>

                    {/* Student Section */}
                    <section className="py-4">
                        <h2 className="text-3xl md:text-4xl font-medium p-4 text-center">Interested in joining? Fill out the form below:</h2>
                        <div className="w-full">
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLSd8sFRwdVTedWxaBa1aNjEWApPxMRx54vtvvnZvteWaB3IGtQ/viewform?embedded=true"
                                className="w-full h-[34rem] md:h-[70rem] p-4">
                            </iframe>
                        </div>
                    </section>

                    {/* Staff, Parents, Others section */}
                    <section className="bg-red-900 py-5">
                        <h2 className="text-3xl md:text-4xl font-bold text-white p-4 text-center text-balance break-words">Have any questions or interested in collaboration? Contact Leo Club at <a href="mailto:farringtonhighschoolleoclub@gmail.com" className="relative md:after:bg-slate-50 md:after:rounded-lg md:after:absolute md:after:w-0 md:after:h-1 md:after:bottom-0 md:after:left-0 md:hover:after:w-full md:after:transition-all md:after:duration-500 md:after:motion-reduce:transition-none md:after:origin-left">farringtonhighschoolleoclub@gmail.com</a></h2>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Contact />
    </StrictMode>
)