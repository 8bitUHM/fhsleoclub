import { useEffect, useState } from "react";
import { ref, set } from "firebase/database";
import { clubMembersRefs } from "../lib/dbRefs";
import type { Member } from "../lib/types";
import { auth, db } from "../lib/config";
import { User, onAuthStateChanged } from "firebase/auth";
import AuthContext from "../contexts/AuthContext";

const AddMember = () => {
    const [member, setMember] = useState<Member>({
        name: "",
        role: "",
        email: "",
    });

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState<User | null>(null);
    const [isReady, setIsReady] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMember((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (aUser) => {
            setUser(aUser);
            setIsReady(true);
            console.log("this is aUser: " + aUser);
            console.log("this is user: " + user);
            console.log("this is auth: " + auth);
        }, (error) => {
            window.alert(error);
            setIsReady(true);
        })

        return () => unsubscribe();
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const emailKey = member.email.replace(/\./g, "_");

        e.preventDefault();
        setLoading(true);
        try {

            const memberRef = ref(db, `club-members/${emailKey}`);
            await set(memberRef, member);

            alert("Member added successfully!");
            setMember({ name: "", role: "", email: "" });
            window.location.href = "/members/";
        } catch (error) {
            if (user) {
                console.log("Signed in as:", user.email);
            } else {
                console.log("Not signed in.");
            }
            console.error("Error adding member:", error);
            alert("Failed to add member.");
        }
        setLoading(false);
    };

    return (
        <>
            {isReady && (
                <>
                    <AuthContext.Provider value={user}>
                        <>
                            <div className="bg-red-900 min-h-screen flex items-center justify-center">
                                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-[40rem] md:h-screen lg:py-0">
                                    <div className="flex items-center mb-6 text-2xl font-semibold text-white">
                                        Add the member
                                    </div>
                                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                                        <div className="p-8 space-y-4 md:space-y-6 sm:p-8">
                                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                                <div>
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-red-900">Name</label>
                                                    <input type="text" name="name" id="name" value={member.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                                </div>
                                                <div>
                                                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-red-900">Role</label>
                                                    <input type="text" name="role" id="role" value={member.role} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                                </div>
                                                <div>
                                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-red-900">Email</label>
                                                    <input type="text" name="email" id="email" value={member.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                                </div>

                                                <button type="submit" disabled={loading} className="w-full text-white bg-red-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-progress disabled:bg-red-500">{loading ? "Adding..." : "Add Member"}</button>

                                                <a href="/" className="font-medium text-red-900 text-sm block hover:underline">Back to home</a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    </AuthContext.Provider>
                </>
            )}
        </>
    );
};

export default AddMember;