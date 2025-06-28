import { ChangeEvent, FormEvent, useState } from "react";
import { get, set } from "firebase/database";
import { auth } from "../lib/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getChildRef, authorizedMembersRef, usersRef } from "../lib/dbRefs";
import { AuthError } from "firebase/auth";
import ErrorMessage from "./ErrorMessage";

const SignupForm = () => {
    const [formFields, setFormFields] = useState({
        email: "",
        password: "",
        "confirm-password": "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState("Test error message");
    const [showMessage, setShowMessage] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value,
        })
    };

    const handleError = (message: string) => {
        setShowMessage(true);
        setMessage(message);
        setIsLoading(prev => !prev);
    };

    const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(prev => !prev);
        const { email, password } = formFields;
        const confirmPassword = formFields['confirm-password'];

        try {

            if (confirmPassword !== password) {
                handleError('Passwords do not match up');
                return;
            }

            const authorizedMember = getChildRef(authorizedMembersRef, email.split('@')[0]);
            const value = await get(authorizedMember);

            if (!value.exists()) {
                handleError('You are not an authorized member. Please contact the site admin if you believe this is a mistake');
                return;
            }

            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            const user = getChildRef(usersRef, userCred.user.uid);
            set(user, true);
            window.location.href = "/";
        } catch (err) {
            setShowMessage(true);
            console.log(err);
            switch ((err as AuthError).code) {
                case "auth/invalid-email":
                    if (email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
                        setMessage("Please fill out all information");
                    } else {
                        setMessage("Please enter a valid email");
                    }
                    break;
                case "auth/email-already-in-use":
                    setMessage("Email is already in use, please use another one");
                    break;
                case "auth/missing-password":
                    setMessage("Please fill out all information");
                    break;
                case "auth/password-does-not-meet-requirements":
                    setMessage("Your password must be at least 6 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
                    break;
                default:
                    if (email.length === 0) {
                        setMessage("Please fill out all information");
                    } else {
                        setMessage("Please try again later");
                    }
                    break;
            }
        }

        setIsLoading(prev => !prev);
    }


    return (
        <>
            <div className="bg-red-900 min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-[40rem] md:h-screen lg:py-0">
                    <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-white">
                        <img className="w-10 h-10 mr-2" src="/fhs-leo-club-logo.png" alt="logo" />
                        FHS Leo Club
                    </a>
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-red-900 md:text-2xl">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-red-900">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-red-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="School Email" required onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-red-900">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-red-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-red-900">Confirm password</label>
                                    <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-red-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required onChange={handleChange} />
                                </div>
                                <button type="submit" className="w-full text-white bg-red-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-progress disabled:bg-red-500" onClick={handleSubmit} disabled={isLoading} aria-disabled={isLoading}>Create an account</button>
                                <p className="text-sm font-normal text-red-900">
                                    Already have an account? <a href="/auth/signin/" className="font-medium text-primary-600 hover:underline">Sign in here</a>
                                </p>
                                <a href="/" className="font-medium text-red-900 text-sm block hover:underline">Back to home</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div >

            <ErrorMessage
                message={message}
                showMessage={showMessage}
                setShowMessage={setShowMessage}
            />
        </>
    );
};

export default SignupForm;