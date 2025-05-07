import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import { auth } from "../lib/config";
import useAuthRedirect from "../lib/useAuthRedirect";
import { User, onAuthStateChanged, signOut, updatePassword } from "firebase/auth";
import { usersRef, getChildRef } from "../lib/dbRefs";
import { set, update } from "firebase/database";
import "../index.css";

export function ResetPassword() {
    const [userCredentials, setUserCredentials] = useState({ password: "", confirmPassword: "" });
    const [user, setUser] = useState<User | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        initFlowbite();
    }, []);

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
    console.log(user?.email);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user || !user.email) return;

        setLoading(true);

        if (userCredentials.password !== userCredentials.confirmPassword) {
            setLoading(false);
            throw "Nooo";
        }
        if (userCredentials.password.length === 0 || userCredentials.confirmPassword.length === 0) {
            // Do the show message thingy.
            setLoading(false);
            throw "Thingies are blank.";
        }

        try {
            const userRef = getChildRef(usersRef, user.uid);

            await updatePassword(user, userCredentials.password);
            // await signOut(auth);
            // window.location.reload();
            console.log("succ");
        } catch (error) {
            console.log(error);
            setLoading(false);
            // Add if "password is too weak, do this"
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
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-red-900">Password</label>
                                    <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={userCredentials.password} onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })} />
                                </div>
                                <div>
                                    <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-red-900">Confirm Password</label>
                                    <input type="password" name="confirmpassword" id="confirmpassword" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={userCredentials.confirmPassword} onChange={(e) => setUserCredentials({ ...userCredentials, confirmPassword: e.target.value })} />
                                </div>

                                {/* add "disabled = {loading}" and "{loading ? "Adding..." : "Add Member"}" later */}
                                <button type="submit" className="w-full text-white bg-red-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-progress disabled:bg-red-500" disabled={loading}>{loading ? "Resetting Password..." : "Reset Password"}</button>

                                <a href="/" className="font-medium text-red-900 text-sm block hover:underline">Back to home</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ResetPassword />
    </StrictMode>
);
