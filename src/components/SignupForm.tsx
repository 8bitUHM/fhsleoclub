import { ChangeEvent, FormEvent, useState } from "react";
import { ref, get } from "firebase/database";
import { auth } from "../lib/config";
import { onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../lib/config";
const SignupForm = () => {
    
    const [ formFields, setFormFields ] = useState({
        email: "",
        password: "",
        "confirm-password": "", 
    }); 
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = (e:FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(prev => !prev);
        const { email, password } = formFields;
        const confirmPassword = formFields['confirm-password'];
        
        const authorizedMemberRef = ref(db, `authorized-members/${email.split('@')[0]}`)
        const usersRef = ref(db, 'users');

        if (email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
            window.alert('Please fill out all required fields');
        } else if (password !== confirmPassword) {
            window.alert('Passwords do not match up');
        } else {
            get(authorizedMemberRef)
            .then((value) => {
                if (!value.exists() || !(value.child('email').val() === email)) {
                    window.alert('You are not authorized to log into site. Please contact site admin if you believe this is a mistake');
                } else {
                    window.alert('authorized user. creating account...');
                }
            })
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
                                    Already have an account? <a href="/signin/" className="font-medium text-primary-600 hover:underline">Sign in here</a>
                                </p>
                                <a href="/" className="font-medium text-red-900 text-sm block hover:underline">Back to home</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default SignupForm;