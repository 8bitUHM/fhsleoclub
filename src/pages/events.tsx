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
            <h1>This is the events page!</h1>
            <Footer />
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Events />
    </StrictMode>
)