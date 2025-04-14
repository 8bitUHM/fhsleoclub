import { useEffect, useState } from "react";
import { clubMembersRefs } from "../lib/dbRefs";
import { child } from "firebase/database";

import { ref, update } from "firebase/database";
import { db } from "../lib/config";

const Update = () => {
    const [advisor, setAdvisor] = useState({ name: "", email: "", role: "" });

    const userEmail = "cindy_mercado@farringtonhighschool_org";
    const userRef = child(clubMembersRefs, `club-members/${userEmail}`);
    const memberRef = ref(db, `clubMembers/${userEmail}`);

    useEffect(() => {
        const stored = localStorage.getItem("advisorData");
        if (stored) {
            setAdvisor(JSON.parse(stored));
        }
    }, []);

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        update(memberRef, {
            email: "cindy_mercado@farringtonhighschool.org",
            name: "Bob",
            role: "club advisor",
        })
            .then(() => {
                console.log("Cindy's data updated successfully");
            })
            .catch((err) => {
                console.log(memberRef);
                console.error("Error updating Cindy's data:", err);
            });
    };

    const handleClick = () => {
        console.log(userRef);
    };

    // const updateMemberName = async (member: Member, newName: string) => {
    //     const sanitizedEmailKey = member.email.replace(/\./g, "_");
    //     const memberRef = ref(db, `clubMembers/${sanitizedEmailKey}`);

    //     try {
    //         await update(memberRef, { name: newName });
    //         console.log("Member name updated successfully!");
    //     } catch (error) {
    //         console.error("Error updating member name:", error);
    //     }
    // };

    // const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     if (!advisor.email) {
    //         alert("Missing email. Please fill out all fields.");
    //         return;
    //     }

    //     const emailKey = advisor.email.replace(/\./g, "_");
    //     const advisorRef = ref(db, `club-members/${emailKey}`);

    //     update(advisorRef, {
    //         name: advisor.name,
    //         role: advisor.role,
    //         email: advisor.email,
    //     })
    //         .then(() => {
    //             alert("Advisor info updated successfully!");
    //             window.location.href = "/";
    //         })
    //         .catch((error) => {
    //             console.error("Update failed:", error);
    //             alert("Something went wrong. Please try again.");
    //         });
    // };

    return (
        <>
            <div className="bg-red-900 min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-[40rem] md:h-screen lg:py-0">
                    <div className="flex items-center mb-6 text-2xl font-semibold text-white">
                        Update the member
                    </div>
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-8 space-y-4 md:space-y-6 sm:p-8">
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-red-900">Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                </div>
                                <div>
                                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-red-900">Role</label>
                                    <input type="text" name="role" id="role" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder={advisor.role} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-red-900">Email</label>
                                    <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder={advisor.email} />
                                </div>

                                <button type="submit" className="w-full text-white bg-red-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-progress disabled:bg-red-500" onClick={handleUpdate}>Update</button>

                                <a href="/" className="font-medium text-red-900 text-sm block hover:underline">Back to home</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Update;