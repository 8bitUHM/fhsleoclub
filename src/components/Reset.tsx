import { useEffect, useState } from "react";
import useAuthRedirect from "../lib/useAuthRedirect";
import { User, onAuthStateChanged, signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential, AuthError } from "firebase/auth";
import { auth } from "../lib/config";
import { usersRef, getChildRef } from "../lib/dbRefs";

const Reset = () => {
    const [userCredentials, setUserCredentials] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [user, setUser] = useState<User | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("Test error message");
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (aUser) => {
            setUser(aUser);
            setIsReady(true);
        }, (error) => {
            window.alert(error);
            setIsReady(true);
        })

        return () => unsubscribe();
    }, [])

    useAuthRedirect();

    const handleError = (message: string) => {
        setShowMessage(true);
        setMessage(message);
        setLoading(prev => !prev);
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);

        if (userCredentials.newPassword.length === 0 || userCredentials.confirmPassword.length === 0 || userCredentials.currentPassword.length === 0) {
            handleError("Please fill out all information");
            return;
        }

        if (userCredentials.newPassword !== userCredentials.confirmPassword) {
            handleError('Passwords do not match up');
            return;
        }


        try {
            const userRef = getChildRef(usersRef, user.uid);

            const credential = EmailAuthProvider.credential(user.email!, userCredentials.currentPassword);
            await reauthenticateWithCredential(user, credential);

            await updatePassword(user, userCredentials.newPassword);
            await signOut(auth);
            window.location.reload();
        } catch (error) {
            console.log(error);
            setShowMessage(true);
            switch ((error as AuthError).code) {
                case "auth/invalid-credential":
                    setMessage("Your current password is incorrect. Please try again.");
                    break;
                case "auth/password-does-not-meet-requirements":
                    setMessage("Your new password must be at least 6 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
                    break;
                default:
                    setMessage("Please try again later");
                    break;
            }
            setLoading(false);
        }
    }

    return (
        <>
            <div className="bg-red-900 min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-[40rem] md:h-screen lg:py-0">
                    <div className="flex items-center mb-6 text-2xl font-semibold text-white">
                        Reset Password
                    </div>
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-8 space-y-4 md:space-y-6 sm:p-8">
                            <form className="space-y-4 md:space-y-6" onSubmit={handleUpdate}>
                                {/* <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-red-900">Email</label>
                                    <input type="text" name="name" id="name" value={member.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                </div> */}
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-red-900">Email</label>
                                    <input type="text" name="email" id="email" value={user?.email || ""} className="bg-gray-200 border border-gray-300 text-gray-500 rounded-lg block w-full p-2.5 cursor-not-allowed" disabled />
                                </div>
                                <div>
                                    <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-red-900">Current Password</label>
                                    <input type="password" name="currentPassword" id="currentPassword" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={userCredentials.currentPassword} onChange={(e) => setUserCredentials({ ...userCredentials, currentPassword: e.target.value })} />
                                </div>
                                <div>
                                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-red-900">New Password</label>
                                    <input type="password" name="newPassword" id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={userCredentials.newPassword} onChange={(e) => setUserCredentials({ ...userCredentials, newPassword: e.target.value })} />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-red-900">Confirm New Password</label>
                                    <input type="password" name="confirmPassword" id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={userCredentials.confirmPassword} onChange={(e) => setUserCredentials({ ...userCredentials, confirmPassword: e.target.value })} />
                                </div>

                                {/* add "disabled = {loading}" and "{loading ? "Adding..." : "Add Member"}" later */}
                                <button type="submit" className="w-full text-white bg-red-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-progress disabled:bg-red-500" disabled={loading}>{loading ? "Resetting Password..." : "Reset Password"}</button>

                                <a href="/" className="font-medium text-red-900 text-sm block hover:underline">Back to home</a>
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
    )
}

export default Reset;