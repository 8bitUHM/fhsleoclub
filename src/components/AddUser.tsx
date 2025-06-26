import useAuthRedirect from "../lib/useAuthRedirect";
import { useState } from "react";
import { authorizedMembersRef, getChildRef } from "../lib/dbRefs";
import { get, set } from "firebase/database";
import { AuthContextProvider } from "../contexts/AuthContext";
import ErrorMessage from "./ErrorMessage";

const AddUser = () => {

    const [email, setEmail] = useState('');
    const [emailToo, setEmailToo] = useState('');
    const [message, setMessage] = useState("Test error message");
    const [showMessage, setShowMessage] = useState(false);

    useAuthRedirect();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailKey = email.split("@")[0];

        if (email !== emailToo) {
            setMessage("Please match the two emails");
            setShowMessage(true);
            return;
        }

        const isValidEmail = (email: string) => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|mil|us|hi\.us|k12\.hi\.us)$/;
            return emailRegex.test(email);
        };

        if (!isValidEmail(email)) {
            setMessage("Please enter a valid email address.");
            setShowMessage(true);
            return;
        }

        console.log(emailKey);
        try {
            //This should be done after a valid email is typed
            const userRef = getChildRef(authorizedMembersRef, emailKey);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                console.log("Hey this email exists buddy boyo");
                return;
            }
            await set(userRef, email);
            window.location.href = "/";
            console.log("user added");

        }
        catch (error) {
            console.error("Error adding user:", error);
        }
    };

    return (
        <>
            <AuthContextProvider>
                <div className="bg-red-900 min-h-screen flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-[40rem] md:h-screen lg:py-0">
                        <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-white">
                            <img className="w-10 h-10 mr-2" src="/fhs-leo-club-logo.png" alt="logo" />
                            FHS Leo Club
                        </a>
                        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                            <div className="p-8 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-red-900 md:text-2xl">
                                    Add User
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-red-900">User's Email</label>
                                        <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="School Email" required />
                                    </div>
                                    <div>
                                        <label htmlFor="emailToo" className="block mb-2 text-sm font-medium text-red-900">Confirm Email</label>
                                        <input type="text" name="emailToo" id="emailToo" value={emailToo} onChange={(e) => setEmailToo(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Confirm School Email" required />
                                    </div>

                                    <button type="submit" className="w-full text-white bg-red-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-progress disabled:bg-red-500">Add User</button>

                                    <a href="/" className="font-medium text-red-900 text-sm block hover:underline">Back to home</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <ErrorMessage
                    message={message}
                    showMessage={showMessage}
                    setShowMessage={setShowMessage}
                />
            </AuthContextProvider>
        </>
    );
};

export default AddUser;