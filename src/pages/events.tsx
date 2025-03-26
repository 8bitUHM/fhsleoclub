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
import Loading from "../components/Loading";

export function Events() {
    const [ events, setEvents ] = useState<ClubEvent[]>([]);
    const [ isLatest, setIsLatest ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        initFlowbite();

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
            <Navbar />
            <Header />
            <main className="px-4 py-6">
                <form className="inline-flex rounded-lg shadow-sm font-medium text-sm text-white bg-rose-600 my-6" role="group">
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


                <section className="gap-x-4 gap-y-4 justify-center" style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 20rem))"}}>
                    {
                        !isLoading ? 
                        (events.map((val, index) => (
                            <article className="grid grid-rows-subgrid gap-y-0 row-span-4 border p-4 border-black rounded-lg bg-neutral-50 shadow-sm" key={`${index}`}>
                                <span className="pb-2 font-normal text-sm text-pink-900">{new Date(val.date).toLocaleDateString()}</span>
                                <h3 className="text-rose-900 font-bold text-lg text-pretty pt-1 sm:text-2xl">
                                    {val.title}
                                </h3>
                                <div className="text-balance text-normal text-sm font-thin leading-5 pt-1 text-gray-600">
                                    <p>{val.location}</p>
                                    {
                                        (val.start_time && val.end_time) ? <p>{`${val.start_time}-${val.end_time}`}</p> : <p>{`${val.start_time}${val.end_time}`}</p>
                                    }
                                </div>
                                <p className="text-pretty leading-6 pt-4">{val.description}</p>
                            </article>
                        ))) : <Loading />
                    }
                </section>
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