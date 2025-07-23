import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const AddEventButton = () => {
    const user = useContext(AuthContext);

    return (
        <>
            {user && (
                <div>
                    <a href="/events/add/">
                        <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium inline-flex rounded-full text-sm px-5 py-2.5 text-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </a>
                </div>
            )}
        </>
    );
};

export default AddEventButton;