import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { set } from "firebase/database";
import { eventRefs, getChildRef } from "../lib/dbRefs";
import { ClubEvent } from "../lib/types";
import useAuthRedirect from "../lib/useAuthRedirect";
import { useEventValidation } from "../lib/useEventValidation";
import { convertTo12 } from "../lib/dateFunctions";

const AddEvent = () => {
  const [event, setEvent] = useState<ClubEvent>({
    title: "",
    description: "",
    location: "",
    start_time: "",
    end_time: "",
    date: 0,
  });
  const {
    loading,
    message,
    showMessage,
    setLoading,
    setMessage,
    setShowMessage,
    checkIfEventExists,
  } = useEventValidation();

  // handles value changes in adding/altering events
  const handleChange = (e: { target: { name: string; value: string } }) => {
    setEvent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.currentTarget.valueAsDate) {
      setEvent((prev) => ({
        ...prev,
        date: 0,
      }));
    } else {
      const inputDate = e.currentTarget.valueAsDate;
      // date is showing as one day before so we want to extract the different time
      // units to create the right date
      const [date, month, year] = [
        inputDate.getUTCDate(),
        inputDate.getUTCMonth(),
        inputDate.getUTCFullYear(),
      ];
      const selDate = new Date(year, month, date);
      setEvent((prev) => ({
        ...prev,
        date: selDate.valueOf(),
      }));
    }
  };

  const handleTimeChange: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const timeString = convertTo12(e.currentTarget.value);
    setEvent((prev) => ({
      ...prev,
      [e.target.name]: timeString,
    }));
  };

  // kicks user back to home page if they aren't logged in
  useAuthRedirect();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const eventYear = new Date(event.date).getFullYear();
    const eventKey = `${event.title.trim().replace(/ /g, "_")}_${eventYear}`;

    e.preventDefault();
    setLoading(true);

    try {
      const eventRef = getChildRef(eventRefs, eventKey);
      
      const exists = checkIfEventExists(eventKey);
      if (!exists) {
        return;
      }
      
      await set(eventRef, event);
      setEvent({
        title: "",
        description: "",
        location: "",
        date: 0,
        start_time: "",
        end_time: "",
      });
      console.log("Event added: ", event.title);

      window.location.href="/events/";
    } catch (err) {
      // checks if required fields are empty
      console.error("Error adding event: ", err);
      console.log(event);
      setShowMessage(true);
      if (
        event.title.length === 0 ||
        event.description.length === 0 ||
        event.location.length === 0 ||
        event.date === 0
      ) {
        setMessage("Please fill out required information");
      } else {
        setMessage(`${err}`);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <section className="bg-red-900 min-h-screen flex items-center justify-center">
        <div className="bg-white py-8 px-4 mx-auto max-w-2xl w-full rounded-lg">
          <h2 className="mb-4 text-xl font-bold text-red-900">Add an event</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 grid-cols-1 sm:gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-red-900"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={event.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-red-900"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={1}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={event.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-red-900"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={event.location}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full flex flex-col *:basis-full md:flex-row justify-stretch items-stretch gap-4">
                <div>
                  <label
                    htmlFor="date"
                    className="block mb-2 text-sm font-medium text-red-900"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5"
                    onChange={handleDateChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="start_time"
                    className="block mb-2 text-sm font-medium text-red-900"
                  >
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="start_time"
                    id="start_time"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5"
                    onChange={handleTimeChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="end_time"
                    className="block mb-2 text-sm font-medium text-red-900"
                  >
                    End Time
                  </label>
                  <input
                    type="time"
                    name="end_time"
                    id="end_time"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5"
                    onChange={handleTimeChange}
                  />
              </div>
            </div>
          </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-red-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 sm:mt-6 text-center disabled:cursor-progress disabled:bg-red-500"
            >
              {loading ? "Adding..." : "Add"}
            </button>

            <a
              href="/events/"
              className="font-medium text-red-900 text-sm block mt-2 hover:underline"
            >
              Back to events
            </a>
          </form>
        </div>
      </section>

      {showMessage && (
        <div
          tabIndex={-1}
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative border-2 border-black bg-white rounded-lg shadow-sm">
              <button
                type="button"
                className="absolute top-3 end-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={() => setShowMessage(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-red-600 w-12 h-12"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-red-600">
                  {message}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEvent;
