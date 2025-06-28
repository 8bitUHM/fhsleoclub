import { ChangeEvent, FormEvent, StrictMode, useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import { createRoot } from "react-dom/client";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/config";
import "../index.css";

export function ForgotPassword() {
  useEffect(() => {
    initFlowbite();
  }, []);

  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  // Checks for valid email patterns
  const regex = /^[\w.-]+@\w+(?:\.\w+){1,2}$/;

  const handleClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const btn = e.currentTarget;
    btn.disabled = true;
    btn.ariaDisabled = "true";
    if (!email) {
      setError("Please fill out email");
    } else if (!regex.test(email)) {
      setError("Please enter a valid email");
    } else {
      try {
        await sendPasswordResetEmail(auth, email);
        setError("");
      } catch (e) {
        setError((e as Error).message);
      }
    }
    btn.disabled = false;
    btn.ariaDisabled = "false";
  };

  return (
    <>
      <main className="bg-red-900 min-h-screen min-w-screen text-white flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 max-w-[50ch]">
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
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-red-600 disabled:cursor-progress"
                onClick={handleClick}
                data-modal-target="modal"
                data-modal-show="modal"
              >
                Reset Password
              </button>
              <section className="text-sm font-medium text-red-900 space-y-2 *:block">
                <a href="/auth/signin/" className="hover:underline">
                  Sign In
                </a>
                <a href="/" className="hover:underline">
                  Back to Home Page
                </a>
              </section>
            </form>
          </div>
        </div>
      </main>
      <dialog
        id="modal"
        className="hidden min-w-full min-h-full top-0 bg-black/75 md:p-0"
      >
        {/* Modal for Success or Error Messages */}
        {!error ? (
          <section className="max-w-[35ch] md:max-w-[40ch] bg-white p-4 rounded-lg flex flex-col justify-center gap-4">
            <h1 className="text-2xl font-bold text-red-800">Mahalo Nui Loa!</h1>
            <p className="text-sm text-gray-500">
              We will send an email to the one entered if it exists in our
              system. Please note that the email may take some time to send. If
              you do not receive the email, please make sure to check your
              Junk/Spam Folder
            </p>
            <a
              href="/auth/signin/"
              data-modal-target="modal"
              data-modal-hide="modal"
              className="p-2 bg-red-700 rounded-lg text-white text-sm font-semibold tracking-wide focus:outline-none focus:ring-4 focus:ring-blue-300 hover:bg-red-600 text-center"
            >
              Take Me to Sign In Page
            </a>
          </section>
        ) : (
          <section className="max-w-[35ch] md:max-w-[40ch] bg-white p-4 rounded-lg flex flex-col justify-center gap-4">
            <h1 className="text-2xl font-bold text-red-500 inline-flex items-center gap-1">
              <svg
                className="w-9 h-9 text-red-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Error Encountered
            </h1>
            <p className="text-sm text-red-900">{error}</p>
            <button
              type="button"
              data-modal-target="modal"
              data-modal-hide="modal"
              className="p-2 bg-red-700 rounded-lg text-white text-sm font-semibold tracking-wide focus:outline-none focus:ring-4 focus:ring-blue-300 hover:bg-red-600 text-center"
            >
              Close
            </button>
          </section>
        )}
      </dialog>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ForgotPassword />
  </StrictMode>
);
