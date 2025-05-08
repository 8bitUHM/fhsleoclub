import { useEffect, useState } from "react";
import useAuthRedirect from "../lib/useAuthRedirect";
import { User, onAuthStateChanged, signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential, AuthError } from "firebase/auth";
import { auth } from "../lib/config";
import ErrorMessage from "./ErrorMessage";

const Reset = () => {
    const [userCredentials, setUserCredentials] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("Test error message");
    const [showMessage, setShowMessage] = useState(false);

    //Helps authenticate the user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (aUser) => {
            setUser(aUser);
        }, (error) => {
            window.alert(error);
        })

        return () => unsubscribe();
    }, [])

    //Kicks the user back to home page if they are not logged in
    useAuthRedirect();

    //Makes the error message popup, sets the error message based on the string input, and sets loading to previous state
    const handleError = (message: string) => {
        setShowMessage(true);
        setMessage(message);
        setLoading(prev => !prev);
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return; //Need this line since user can be either "User" or Null. Without this line, terminal gets angry grrr

        setLoading(true);

        // //Destructures the object to avoid having this big line "if (userCredentials.newPassword.length === 0 || userCredentials.confirmPassword.length === 0 || userCredentials.currentPassword.length === 0) {"
        const { newPassword, confirmPassword, currentPassword } = userCredentials;

        if (!newPassword || !confirmPassword || !currentPassword) {
            handleError("Please fill out all information");
            return;
        }

        if (newPassword !== confirmPassword) {
            handleError('Passwords do not match up');
            return;
        }

        try {
            //checks if its the correct password using firebase's reaunthentication method
            const credential = EmailAuthProvider.credential(user.email!, currentPassword);
            await reauthenticateWithCredential(user, credential);

            //Updates the user with their new password, signs them out, and puts them in the signin page
            await updatePassword(user, newPassword);
            await signOut(auth);
            window.location.href = `${window.location.origin}/auth/signin/`;
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
                                <button type="submit" className="w-full text-white bg-red-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-progress disabled:bg-red-500" disabled={loading}>{loading ? "Resetting Password..." : "Reset Password"}</button>

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
        </>
    )
}

export default Reset;