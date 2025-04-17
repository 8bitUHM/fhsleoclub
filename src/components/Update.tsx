import { useEffect, useState } from "react";
import { clubMembersRefs, getChildRef } from "../lib/dbRefs";
import { set } from "firebase/database";

const Update = () => {
    const [member, setMember] = useState({ name: "", email: "", role: "" });

    const userEmail = "cindy_mercado@farringtonhighschool_org";
    // console.log(typeof (member.email))

    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("memberData");
        if (stored) {
            setMember(JSON.parse(stored));
        }
    }, []);

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        const userEmailKey = member.email.replace(/\./g, "_");
        const memberRef = getChildRef(clubMembersRefs, userEmailKey);

        set(memberRef, {
            name: member.name,
            email: member.email,
            role: member.role,
        })
            .then(() => {
                console.log("Members's data updated successfully");
                window.location.href = "/members/";
            })
            .catch((err) => {
                console.error("Error updating Cindy's data:", err);
            });
    };

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
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={member.name} onChange={(e) => setMember({ ...member, name: e.target.value })} placeholder={member.name} />
                                </div>
                                <div>
                                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-red-900">Role</label>
                                    <div className="relative inline-block w-full">
                                        <button type="button" onClick={() => setShowDropdown(!showDropdown)} className="text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-left inline-flex justify-between items-center w-full">
                                            {member.role || "Select role"}
                                            <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                            </svg>
                                        </button>

                                        {showDropdown && (
                                            <div className="absolute z-10 mt-2 w-full bg-white divide-y divide-gray-100 rounded-lg shadow">
                                                <ul className="py-2 text-sm text-red-900">
                                                    {["Club Advisor", "President", "Vice President", "Secretary", "Treasurer", "Public Relations", "Member"].map((role) => (
                                                        <li key={role}>
                                                            <button type="button" onClick={() => {
                                                                setMember({ ...member, role });
                                                                setShowDropdown(false);
                                                            }}
                                                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                                            >
                                                                {role}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="opacity-50">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-red-900">Email</label>
                                    <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={member.email} onChange={(e) => setMember({ ...member, email: e.target.value })} disabled placeholder={member.email} />
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