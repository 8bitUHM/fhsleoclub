
import { useEffect, useState } from "react";
import { eventRefs, getChildRef } from "../lib/dbRefs";
import { set, remove } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/config";

const UpdateEvent = () => {
    const [event, setEvent] = useState({ description: "", end_time: "", start_time: "", title: "", location: "", date: 0});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("Test error message");
    const [showMessage, setShowMessage] = useState(false);

    // key for events db reference
    const [prevTitle, setPrevTitle] = useState(""); 

    // Kicks the user back to home page if they are not logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser?.email === undefined) {
            window.location.href = "/";
            }
        });
    
        return () => unsubscribe();
    }, []);

    // grabs what the user clicked on to "update" from events page
    useEffect(() => {
        const stored = sessionStorage.getItem("eventsData");
        if (stored) {
            const parsed = JSON.parse(stored);
            setPrevTitle(parsed.title);
            setEvent(parsed);
        }
    }, []);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const titleKey = event.title.replace(/\./g, "_");
        const prevTitleKey = prevTitle.replace(/\./g, "_");

        setLoading(true);
        try {
            const eventRef = getChildRef(eventRefs, titleKey);

            // Updates the event's data as long as it doesn't run into any errors
            await set(eventRef, {
                title: event.title,
                description: event.description,
                location: event.location,
                date: event.date,
                start_time: event.start_time,
                end_time: event.end_time
            })
            console.log("Events' data updated successfully.");

            // This removes the previous member data only if the current email and previous email are not the same
            if (titleKey !== prevTitleKey) {
                const prevTitleRef = getChildRef(eventRefs, prevTitleKey);
                remove(prevTitleRef);
            }

            window.location.href = "/events/";

        } catch (err) {
            // Checks if required fields are empty 
            console.error("Error updating event data: ", err);
            setShowMessage(true);
            if (event.title.length === 0 || event.description.length === 0 || event.location.length === 0 
                || event.date === 0
            ) {
                setMessage("Please fill in the blanks");
            } 
        }
        setLoading(false);
    };

    // takes change in input and modifies event given the updated input values
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEvent({...event, [e.target.name]: e.target.value});
    };

    return (
        <>
            <div className="bg-red-900 min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-[40rem] md:h-screen lg:py-0">
                    <div className="flex items-center mb-6 text-2xl font-semibold text-white">
                        Update the event
                    </div>
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-8 space-y-4 md:space-y-6 sm:p-8">
                            <form className="space-y-4 md:space-y-6" onSubmit={handleUpdate}>
                                <div>
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-red-900">Title</label>
                                    <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={event.title} onChange={handleInputChange} placeholder={event.title} />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-red-900">Description</label>
                                    <input type="text" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={event.description} onChange={handleInputChange} placeholder={event.description} />
                                </div>
                                <div>
                                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-red-900">Location</label>
                                    <input type="text" name="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={event.location} onChange={handleInputChange} placeholder={event.location} />
                                </div>
                                <div>
                                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-red-900">Date</label>
                                    <input type="number" name="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={event.date} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label htmlFor="start-time" className="block mb-2 text-sm font-medium text-red-900">Start Time</label>
                                    <input type="text" name="start-time" id="start-time" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={event.start_time} onChange={handleInputChange} placeholder={event.start_time} />
                                </div>
                                <div>
                                    <label htmlFor="end-time" className="block mb-2 text-sm font-medium text-red-900">End Time</label>
                                    <input type="text" name="end-time" id="end-time" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={event.end_time} onChange={handleInputChange} placeholder={event.end_time} />
                                </div>

                                <button type="submit" disabled={loading} className="w-full text-white bg-red-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-progress disabled:bg-red-500">{loading ? "Updating..." : "Update"}</button>

                                <a href="/events/" className="font-medium text-red-900 text-sm block hover:underline">Back to events</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {showMessage && (
                <div tabIndex={-1} className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative border-2 border-black bg-white rounded-lg shadow-sm">
                            <button type="button" className="absolute top-3 end-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                onClick={() => setShowMessage(false)}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-red-600 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-red-600">{message}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateEvent;