import { useState } from "react";
import { set } from "firebase/database";
import { clubMembersRefs, getChildRef } from "../lib/dbRefs";
import type { Member } from "../lib/types";
import useAuthRedirect from "../lib/useAuthRedirect";
import { useMemberValidation } from "../lib/useMemberValidation";
import ErrorMessage from "./ErrorMessage";

const AddMember = () => {
    const [member, setMember] = useState<Member>({
        name: "",
        role: "",
        email: "",
    });
    const [showDropdown, setShowDropdown] = useState(false);
    const {
        loading,
        message,
        showMessage,
        setLoading,
        setMessage,
        setShowMessage,
        checkIfMemberExists,
    } = useMemberValidation();


    const handleChange = (e: { target: { name: string; value: string } }) => {
        setMember((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    //Kicks the user back to home page if they are not logged in
    useAuthRedirect();

    // Updates the member
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const emailKey = member.email.replace(/\./g, "_");

        e.preventDefault();
        setLoading(true);
        try {
            const memberRef = getChildRef(clubMembersRefs, emailKey);

            //checks if the user's email exists in the database.
            const exists = await checkIfMemberExists(member.email);
            if (exists) return;

            // makes all the characters in member.role lowercase
            const memberRoleLower = {
                ...member,
                role: member.role.toLowerCase(),
            };

            await set(memberRef, memberRoleLower);
            setMember({ name: "", role: "", email: "" });
            window.location.href = "/members/";

        } catch (error) {
            // Checks if the fields are empty or if email is an invalid entry
            console.error("Error adding member:", error);
            setShowMessage(true);
            if (member.name.length === 0 || member.role.length === 0 || member.email.length === 0) {
                setMessage("Please fill out required information");
            } else {
                setMessage("Email must be valid");
            }
        }
        setLoading(false);
    };

    return (
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
                                    <div className="relative inline-block w-full">
                                        <button type="button" id="dropdownDefaultButton" onClick={() => setShowDropdown(!showDropdown)} className="text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-left inline-flex justify-between items-center w-full">
                                            {member.role || "Select Role"}
                                            <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l4 4 4-4" />
                                            </svg>
                                        </button>
                                        {showDropdown && (
                                            <div className="absolute z-10 mt-2 w-full bg-white divide-y divide-gray-100 rounded-lg shadow">
                                                <ul className="py-2 text-sm text-red-900">
                                                    {["Club Advisor", "President", "Vice President", "Secretary", "Treasurer", "Public Relations", "Member"].map(role => (
                                                        <li key={role}>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    handleChange({ target: { name: "role", value: role } });
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
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-red-900">Email</label>
                                    <input type="text" name="email" id="email" value={member.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                </div>

                                <button type="submit" disabled={loading} className="w-full text-white bg-red-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-progress disabled:bg-red-500">{loading ? "Adding..." : "Add Member"}</button>

                                <a href="/members/" className="font-medium text-red-900 text-sm block hover:underline">Back to members</a>
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
    );
};

export default AddMember;