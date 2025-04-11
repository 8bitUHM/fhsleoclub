import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import { clubMembersRefs } from "../lib/dbRefs";
import { onValue } from "firebase/database";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Member, Roles } from "../lib/types";
import { auth } from "../lib/config";
import { User, onAuthStateChanged } from "firebase/auth";
import AuthContext from "../contexts/AuthContext";
import "../index.css";


export function Members() {

  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<Record<string, Member>>({});
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    initFlowbite();
  })

  useEffect(() => {
    const unsubscribe = onValue(clubMembersRefs, (snapshot) => {
      if (snapshot.exists()) {
        setMembers(snapshot.val());
        setIsLoading(false);
      } else {
        setMembers({});
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (aUser) => {
      setUser(aUser);
      setIsReady(true);
    }, (error) => {
      window.alert(error);
      setIsReady(true);
    })

    return () => unsubscribe();
  }, [])

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const categorizeMembers = (members: Record<string, Member>) => {
    const advisors: Member[] = [];
    const officers: Member[] = [];
    const generalMembers: Member[] = [];

    Object.values(members).forEach((member) => {
      if (member.role.toLowerCase() === "club advisor") {
        advisors.push(member);
      } else if (member.role in Roles) {
        officers.push(member);
      } else {
        generalMembers.push(member);
      }
    });

    return { advisors, officers, generalMembers };
  };

  const { advisors, officers, generalMembers } = categorizeMembers(members);

  return (
    <>
      {isReady && (
        <>
          <AuthContext.Provider value={user}>
            <Navbar />
            <Header />

            {
              !isLoading && (
                <>
                  {/* Advisors Section */}
                  <section className="bg-red-900 p-6 text-white text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold pb-6">Advisors</h2>
                    <div className="flex flex-wrap justify-center items-center gap-x-11 gap-y-4">
                      {advisors.map((member) => (
                        <div key={member.email} className="mb-4 space-y-1">
                          <div className="text-lg font-medium">{member.name}</div>
                          <div className="capitalize">{member.role}</div>
                          <div>
                            <a href={`mailto:${member.email}`} className="flex justify-center hover:underline">
                              <svg className="w-8 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                              </svg>
                              <span>Email</span>
                            </a>
                          </div>
                          {
                            user ?
                              <>
                                <div>
                                  <button onClick={() => {
                                    localStorage.setItem("advisorData", JSON.stringify(member));
                                    window.location.href = "/update/";
                                  }}
                                    type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mt-2">Update</button>
                                </div>
                                <div>
                                  <a href="/">
                                    <button type="button" className="text-white bg-red-600 hover:bg-red-700 border-2 border-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2">Delete</button>
                                  </a>
                                </div>
                              </> :
                              null
                          }
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Officers Section */}
                  <section className="p-6 text-red-900 text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold pb-6">Officers</h2>
                    <div className="grid grid-cols-2 gap-x-4 justify-center items-center md:grid-cols-3 lg:grid-cols-6">
                      {officers.sort((a, b) => Roles[a.role] - Roles[b.role]).map((member) => (
                        <div key={member.email} className="mb-4 space-y-1 grid grid-rows-[auto_auto_auto_auto] items-start">
                          <div className="text-lg font-medium">{member.name}</div>
                          <div className="capitalize">{member.role}</div>
                          <div>
                            <a href={`mailto:${member.email}`} className="flex justify-center hover:underline">
                              <svg className="w-8 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                              </svg>
                              <span>Email</span>
                            </a>
                          </div>
                          <div className="">
                            {
                              user ?
                                <>
                                  <div>
                                    <a href="/update/">
                                      <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Update</button>
                                    </a>
                                  </div>
                                  <div>
                                    <a href="/">
                                      <button type="button" className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2">Delete</button>
                                    </a>
                                  </div>
                                </> :
                                null
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* General Members Section */}
                  <section className="bg-red-900 p-6 text-white text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold pb-6">Club Members</h2>
                    <div className="flex justify-center">
                      <div className="grid grid-flow-row-dense grid-cols-2 lg:grid-cols-4 place-items-center gap-x-8 gap-y-2">
                        {generalMembers.map((member) => (
                          <div key={member.email} className="mb-4 space-y-1">
                            <div className="text-lg font-medium">{member.name}</div>
                            <div>
                              <a href={`mailto:${member.email}`} className="flex justify-center hover:underline">
                                <svg className="w-8 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                                </svg>
                                <span>Email</span>
                              </a>
                            </div>
                            <div className="">
                              {
                                user ?
                                  <>
                                    <div>
                                      <a href="/update/">
                                        <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2">Update</button>
                                      </a>
                                    </div>
                                    <div>
                                      <button type="button" className="text-white bg-red-600 hover:bg-red-700 border-2 border-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" onClick={openModal}>Delete</button>
                                    </div>

                                    {isModalOpen && (
                                      <>

                                        <div id="popup-modal" tabIndex={-1} className="flex justify-center items-center fixed inset-0 z-50">

                                          {/* Darkened Background (Overlay) */}
                                          <div
                                            className="absolute inset-0 bg-black opacity-50"
                                            onClick={closeModal}
                                          ></div>


                                          <div className="relative p-4 w-full max-w-md max-h-full z-50">
                                            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 ">

                                              <button
                                                type="button"
                                                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={closeModal}
                                              >
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                              </button>


                                              <div className="p-4 md:p-5 text-center">
                                                <svg
                                                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                                  aria-hidden="true"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  viewBox="0 0 20 20"
                                                >
                                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                  Are you sure you want to delete this product?
                                                </h3>

                                                <button
                                                  type="button"
                                                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                                  onClick={closeModal}
                                                >
                                                  Yes, I'm sure
                                                </button>

                                                <button
                                                  type="button"
                                                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                  onClick={closeModal}
                                                >
                                                  No, cancel
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )}


                                  </> :
                                  null
                              }
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                  <Footer />
                </>
              )
            }
          </AuthContext.Provider>
        </>
      )}
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Members />
  </StrictMode>
);
