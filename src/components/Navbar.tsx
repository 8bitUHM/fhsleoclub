import { initFlowbite } from "flowbite";
import { useEffect } from "react";

const Navbar = () => {

    let isSignedIn = false;

    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <>
            <nav className="bg-red-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse order-1 ml-0">
                        <img src="/fhs-leo-club-logo.png" className="w-10 h-10" alt="Leo Club Logo" />
                        <span className="self-center text-2xl font-semibold text-white whitespace-nowrap">FHS Leo Club</span>
                    </a>

                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 order-3" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>

                    <div className="hidden w-full md:block md:w-auto order-3 md:order-2" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-red-900 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-red-900 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="/" className="block py-2 px-3 text-white rounded-sm hover:bg-red-800 focus:bg-red-800 md:py-2 md:bg-transparent" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="/events/" className="block py-2 px-3 text-white rounded-sm hover:bg-red-800 focus:bg-red-800 md:py-2 md:bg-transparent md:border-0">Events</a>
                            </li>
                            <li>
                                <a href="/contact/" className="block py-2 px-3 text-white rounded-sm hover:bg-red-800 focus:bg-red-800 md:py-2 md:bg-transparent md:border-0">Contact</a>
                            </li>
                            <li>
                                <a href="/members/" className="block py-2 px-3 text-white rounded-sm hover:bg-red-800 focus:bg-red-800 md:py-2 md:bg-transparent md:border-0">Members</a>
                            </li>

                        </ul>
                    </div>

                    <div className="flex items-center pt-1 order-2 md:order-last space-x-0 md:space-x-3">
                        {isSignedIn ? (
                            <>
                                <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                    <span className="sr-only">Open user menu</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                                        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                                    </svg>
                                </button>

                                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm" id="user-dropdown">
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-900">Maximilien Featherstone</span>
                                        <span className="block text-sm text-gray-500">Maximilien_Featherstone_2023@farringtonhighschool.org</span>
                                    </div>
                                    <ul className="py-2" aria-labelledby="user-menu-button">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700">Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <button type="button" className="text-red-900 bg-white border border-gray-300 font-medium rounded-lg text-sm px-4 py-2">Sign-In</button>
                        )}
                    </div>

                </div>
            </nav>








        </>
    );

};

export default Navbar;