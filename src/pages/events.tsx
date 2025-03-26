import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { eventRefs } from "../lib/dbRefs";
import { ClubEvent } from "../lib/types";
import { onValue } from "firebase/database";
import "../index.css";

export function Events() {
    const [ events, setEvents ] = useState<Record<string, ClubEvent>>({});
    const [ order, setOrder ] = useState<"latest" | "earliest">("latest");
    
    useEffect(() => {
        initFlowbite();

        const unsubscribe = onValue(eventRefs, (snapshot) => {
            if (snapshot.exists()) {
                setEvents(snapshot.val());
            }
        });

        return () => unsubscribe();
    }, []);
    
    return (
        <>
            <Navbar />
            <Header />
            <main className="p-8">
                <form className="inline-flex rounded-lg shadow-sm font-medium text-sm text-white bg-red-600/85" role="group">
                    <p className="sr-only">Sort by latest or earliest events</p>
                    <button type="button" 
                            className="px-4 py-2 rounded-s-lg hover:bg-red-800 inline-flex items-center text-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-900" 
                            value="latest"
                            onClick={() => setOrder("latest")}
                            >
                        Latest
                    </button>
                    <button type="button" 
                            className="px-4 py-2 rounded-e-lg hover:bg-red-800 inline-flex items-center text-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-900" 
                            value="earliest"
                            onClick={() => setOrder("earliest")}
                            >
                        Earliest
                    </button>
                </form>
            
            </main>
            <Footer />
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Events />
    </StrictMode>
)