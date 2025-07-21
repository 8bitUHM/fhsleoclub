import { useContext } from "react";
import { ClubEvent } from "../lib/types";
import { remove } from "firebase/database";
import { eventRefs, getChildRef } from "../lib/dbRefs";
import AuthContext from "../contexts/AuthContext";

interface EventDataProps {
    event: ClubEvent;
    setSelectedEvent: (event: ClubEvent) => void;
    selectedEvent: ClubEvent | null;
}

const EventData: React.FC<EventDataProps> = ({ event, setSelectedEvent, selectedEvent}) => {
    const user = useContext(AuthContext);
    const eventDate = new Date(event.date);

    const handleDelete = async (title: string) => {
        const titleString = `${title.replace(/ /g, "_")}_${eventDate.getFullYear()}`;
        const eventRef = getChildRef(eventRefs, titleString);
        try {
            await remove(eventRef);
            console.log("Event Deleted Successfully");
        } catch (error) {
            console.error("Error Deleting Event: ", error);
        }
    };

    return (
    <>
        <span className="pb-2 font-normal text-sm text-pink-900">{eventDate.toLocaleDateString()}</span>
        <hgroup>
            <h3 className="text-rose-900 font-bold text-lg text-pretty pt-1 sm:text-2xl">
                {event.title}
            </h3>
            <div className="text-balance text-normal text-sm font-thin leading-5 pt-1 text-gray-600">
                <p>{event.location}</p>
                {
                    (event.start_time && event.end_time) ? <p>{`${event.start_time}-${event.end_time}`}</p> : <p>{`${event.start_time}${event.end_time}`}</p>
                }
            </div>
        </hgroup>
        <p className="text-pretty leading-6 pt-4">{event.description}</p>
        {user && (
            <>
            <div className="flex flex-wrap justify-center gap-2 mt-4 w-full">
                <div>
                    <button onClick={() => {
                    sessionStorage.setItem("eventData", JSON.stringify(event));
                    window.location.href = "/events/update/";
                    }}
                    type="button" className="text-white bg-blue-600 flex hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                    </button>
                </div>
                <div>
                    <button
                    onClick={() => setSelectedEvent(event)}
                    data-modal-target="popup-modal" data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-700 inline-flex focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
                    </svg>
                    </button>
                </div>
            </div>

            <div id="popup-modal" tabIndex={-1} className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative border-2 border-black bg-white rounded-lg shadow-sm">
                        <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-black">Are you sure you want to delete {selectedEvent?.title}</h3>
                            <button onClick={() => {
                                if (selectedEvent)
                                    handleDelete(selectedEvent.title);
                                }} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Yes, I'm sure
                            </button>
                            <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            </>

        )}
    </>
    );
};

export default EventData;