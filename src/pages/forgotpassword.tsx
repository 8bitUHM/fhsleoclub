import { FormEvent, StrictMode, useEffect, useRef } from "react";
import { initFlowbite } from "flowbite";
import { createRoot } from "react-dom/client";

import "../index.css";

export function ForgotPassword() {
  useEffect(() => {
    initFlowbite();
  }, []);

  const emailRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert(emailRef.current!.value);
  };

  return (
    <>
      <main className="bg-red-900 min-h-screen min-w-screen text-white flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 max-w-[50ch]">
          <a href="/" className="flex items-center mb-6 text-2xl font-bold">
            <img
              className="w-10 h-10 mr-2"
              src="/fhs-leo-club-logo.png"
              alt="logo"
            />
            FHS Leo Club
          </a>
          <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight text-red-900 md:text-2xl">
              Password Reset via Email
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-red-800"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Your email"
                  required
                  ref={emailRef}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleClick}
              >
                Reset Password
              </button>
              <section className="text-sm font-medium text-red-900 space-y-2 *:block">
                <a href="/signup/">Sign Up</a>
                <a href="/">Back to Home Page</a>
              </section>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ForgotPassword />
  </StrictMode>
);