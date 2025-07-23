import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { eventRefs } from "../lib/dbRefs";
import { ClubEvent } from "../lib/types";
import { onValue } from "firebase/database";
import Loading from "../components/Loading";
import { AuthContextProvider } from "../contexts/AuthContext";
import "../index.css";
import EventData from "../components/EventData";
import AddEventButton from "../components/AddEventButton";
import { initFlowbite } from "flowbite";

export function Events() {
    const [ events, setEvents ] = useState<ClubEvent[]>([]);
    const [ isLatest, setIsLatest ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);

    
    useEffect(() => {
        initFlowbite();
    })

    useEffect(() => {
        const unsubscribe = onValue(eventRefs, (snapshot) => {
            if (snapshot.exists()) {
                let values:ClubEvent[] = Object.values(snapshot.val());
                // Initially setting events to be latest first
                values = values.sort((a, b) => (b.date >= a.date ? 1 : -1));
                setEvents(values);
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);


    const handleClick = () => {
        setIsLatest(!isLatest);
        if (isLatest) {
            events.sort((a, b) => a.date >= b.date ? 1 : -1);
        } else {
            events.sort((a, b) => a.date < b.date ? 1 : -1);
        }

    }
    
    return (
        <>
            <AuthContextProvider>
                <Navbar />
                <Header />
                <main className="px-4 py-6">
                    <form className="flex flex-col w-fit rounded-lg shadow-sm font-medium text-sm text-white bg-rose-600 my-6" role="group">
                        <p className="sr-only">Sort by latest or earliest events</p>
                        <button type="button" 
                                className="px-4 py-2 rounded-lg hover:bg-rose-700 inline-flex items-center text-center gap-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-900"
                                onClick={() => { handleClick(); }}
                                >
                            Sort Dates 
                            { 
                                isLatest ? 
                                (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                        <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd" />
                                    </svg>
                                )
                                : 
                                (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                        <path fillRule="evenodd" d="M10 18a.75.75 0 0 1-.75-.75V4.66L7.3 6.76a.75.75 0 0 1-1.1-1.02l3.25-3.5a.75.75 0 0 1 1.1 0l3.25 3.5a.75.75 0 1 1-1.1 1.02l-1.95-2.1v12.59A.75.75 0 0 1 10 18Z" clipRule="evenodd" />
                                    </svg>                               
                                )
                            }
                        </button>
                    </form>

                    <AddEventButton />

                    <section className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {
                            !isLoading ? 
                            (events.map((val, index) => (
                                <article className="grid lg:grid-rows-subgrid lg:row-span-4 border p-4 border-black rounded-lg bg-neutral-50 shadow-sm" key={`${index}`}>
                                    <EventData 
                                       event={val}
                                       selectedEvent={selectedEvent}
                                       setSelectedEvent={setSelectedEvent} 
                                    />
                                </article>
                            ))) : <Loading />
                        }
                    </section>
                </main>
                <Footer />
            </AuthContextProvider>
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Events />
    </StrictMode>
)