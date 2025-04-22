import { ChangeEvent, FormEvent, useState} from "react";
import { auth } from "../lib/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthError } from "firebase/auth";

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
                        setShowMessage(true);
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
                                    <a href="/forgot-password/" className="text-sm font-medium text-red-900 hover:underline w-fit">Forgot password?</a>
                                    <a href="/signup/" className="text-sm font-medium text-red-900 hover:underline">Don't have an account? Sign up here</a>
                                </div>

                                <button type="submit" className="w-full text-white bg-red-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-progress disabled:bg-red-500" onClick={handleClick} disabled={isLoading || showMessage} aria-disabled={isLoading || showMessage}>Sign in</button>

                                <a href="/" className="font-medium text-red-900 text-sm block hover:underline">Back to home</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {showMessage && (
                <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative border-2 border-black bg-white rounded-lg shadow-sm">
                            <button type="button" className="absolute top-3 end-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                onClick={() => setShowMessage(false)}
                                >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-red-600 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-red-600">{message}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
};

export default SignInForm;