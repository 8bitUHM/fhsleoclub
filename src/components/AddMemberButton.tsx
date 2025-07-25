import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const AddMemberButton = () => {
    const { user } = useContext(AuthContext);

    return (
        <>
            {user && (
                <div>
                    <a href="/members/add/">
                        <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium inline-flex rounded-full text-sm px-5 py-2.5 text-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                            </svg>
                        </button>
                    </a>
                </div>
            )}
        </>
    );
};

export default AddMemberButton;