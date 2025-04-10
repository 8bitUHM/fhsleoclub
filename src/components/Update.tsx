import { ChangeEvent, FormEvent, useState } from "react";
import { auth } from "../lib/config";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const Update = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formFields, setFormFields] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value,
        }));
    }

    const handleClick = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(prev => !prev);
        const { email, password } = formFields;

        if (email === '' || password === '') {
            window.alert('Please fill out all information');
        } else {
            signInWithEmailAndPassword(auth, email, password).catch((e) => window.alert(e));
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    window.location.href = "/";
                }
            })
        }

        setIsLoading(prev => !prev);
    }

    return (
        <>
            <div className="bg-red-900 min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-[40rem] md:h-screen lg:py-0">
                    <div className="flex items-center mb-6 text-2xl font-semibold text-white">
                        Update the user
                    </div>
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-8 space-y-4 md:space-y-6 sm:p-8">
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-red-900">Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Name of person" required onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-red-900">Role</label>
                                    <input type="text" name="role" id="role" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Role of person" required onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-red-900">Email</label>
                                    <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Email of person" required onChange={handleChange} />
                                </div>

                                <button type="submit" className="w-full text-white bg-red-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-progress disabled:bg-red-500" onClick={handleClick} disabled={isLoading} aria-disabled={isLoading}>Update</button>

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