import { ChangeEvent, FormEvent, useState } from "react";
import { auth } from "../lib/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthError } from "firebase/auth";
import ErrorMessage from "./ErrorMessage";

const SignInForm = () => {
    const [message, setMessage] = useState("Test error message");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formFields, setFormFields] = useState({
        email: "",
        password: "",
    });
    const [showMessage, setShowMessage] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value,
        }));
    }

    const handleClick = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(prev => !prev);
        const { email, password } = formFields;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = "/";
        } catch (err) {
            setShowMessage(true);
            switch ((err as AuthError).code) {
                case "auth/invalid-email":
                    if (email.length === 0 || password.length === 0) {
                        setMessage("Please fill out all information");
                    } else {
                        setMessage("Please enter a valid email");
                    }
                    break;
                case "auth/invalid-credential":
                    setMessage("Invalid email or password");
                    break;
                default:
                    setMessage("Please try again later");
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
                        <div className="p-8 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-red-900 md:text-2xl">
                                Sign In to Account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-red-900">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="School Email" required onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-red-900">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required onChange={handleChange} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <a href="/auth/forgot-password/" className="text-sm font-medium text-red-900 hover:underline w-fit">Forgot password?</a>
                                    <a href="/auth/signup/" className="text-sm font-medium text-red-900 hover:underline">Don't have an account? Sign up here</a>
                                </div>

                                <button type="submit" className="w-full text-white bg-red-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-progress disabled:bg-red-500" onClick={handleClick} disabled={isLoading || showMessage} aria-disabled={isLoading || showMessage}>Sign in</button>

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
    );
};

export default SignInForm;