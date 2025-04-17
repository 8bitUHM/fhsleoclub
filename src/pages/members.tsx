import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import { clubMembersRefs } from "../lib/dbRefs";
import { onValue, ref, remove, child } from "firebase/database";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Member, Roles } from "../lib/types";
import { auth, db } from "../lib/config";
import { User, onAuthStateChanged } from "firebase/auth";
import AuthContext from "../contexts/AuthContext";
import "../index.css";


export function Members() {

  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<Record<string, Member>>({});
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

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

  const categorizeMembers = (members: Record<string, Member>) => {
    const advisors: Member[] = [];
    const officers: Member[] = [];
    const generalMembers: Member[] = [];

    Object.values(members).forEach((member) => {
      const role = member.role.toLowerCase(); //This line of code is changed in the chance that a person adds a member's role as "Vice President" and not "vice president"

      if (role === "club advisor") {
        advisors.push(member);
      } else if (role in Roles) {
        officers.push(member);
      } else {
        generalMembers.push(member);
      }
    });

    return { advisors, officers, generalMembers };
  };

  const { advisors, officers, generalMembers } = categorizeMembers(members);

  const handleDelete = (email: string) => {
    const encodedEmail = email.replace(/\./g, "_");
    const memberRef = child(clubMembersRefs, encodedEmail);
    remove(memberRef)
      .then(() => {
        console.log("Member deleted successfully.");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting member:", error);
      });
  };

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
                    {user ?
                      <>

                        <div>
                          <a href="/add/">
                            <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-6">Add Member</button>
                          </a>
                        </div>

                      </> : null
                    }

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
                                    localStorage.setItem("memberData", JSON.stringify(member));
                                    window.location.href = "/update/";
                                  }}
                                    type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mt-2">Update</button>
                                </div>

                                <div>
                                  <button
                                    onClick={() => setSelectedMember(member)}
                                    data-modal-target="popup-modal" data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-700 border-2 border-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2">Delete</button>
                                </div>

                                <div id="popup-modal" tabIndex={-1} className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                  <div className="relative p-4 w-full max-w-md max-h-full">
                                    <div className="relative border-2 border-black bg-white rounded-lg shadow-sm">
                                      <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                      </button>
                                      <div className="p-4 md:p-5 text-center">
                                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <h3 className="mb-5 text-lg font-normal text-black">Are you sure you want to delete {selectedMember?.name}</h3>
                                        <button onClick={() => {
                                          if (selectedMember)
                                            handleDelete(selectedMember.email);
                                        }} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                          Yes, I'm sure
                                        </button>
                                        <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">No, cancel</button>
                                      </div>
                                    </div>
                                  </div>
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
                    {user ?
                      <>
                        <div>
                          <a href="/add/">
                            <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-6">Add Member</button>
                          </a>
                        </div>
                      </> : null
                    }
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
                                      <button onClick={() => {
                                        localStorage.setItem("memberData", JSON.stringify(member));
                                        window.location.href = "/update/";
                                      }} type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mt-2">Update</button>
                                    </a>
                                  </div>
                                  <div>
                                    <button onClick={() => setSelectedMember(member)} data-modal-target="popup-modal" data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-700 border-2 border-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2">Delete</button>
                                  </div>

                                  <div id="popup-modal" tabIndex={-1} className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                    <div className="relative p-4 w-full max-w-md max-h-full">
                                      <div className="relative border-2 border-black bg-white rounded-lg shadow-sm">
                                        <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                          </svg>
                                          <span className="sr-only">Close modal</span>
                                        </button>
                                        <div className="p-4 md:p-5 text-center">
                                          <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                          </svg>
                                          <h3 className="mb-5 text-lg font-normal text-black">Are you sure you want to delete this {member.name}.</h3>
                                          <button onClick={() => {
                                            if (selectedMember)
                                              handleDelete(selectedMember.email);
                                          }} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                            Yes, I'm sure
                                          </button>
                                          <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">No, cancel</button>
                                        </div>
                                      </div>
                                    </div>
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
                    {user ?
                      <>
                        <div>
                          <a href="/add/">
                            <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-6">Add Member</button>
                          </a>
                        </div>
                      </> : null
                    }
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
                                        <button onClick={() => {
                                          localStorage.setItem("memberData", JSON.stringify(member));
                                          window.location.href = "/update/";
                                        }} type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mt-2">Update</button>
                                      </a>
                                    </div>
                                    <div>
                                      <button onClick={() => setSelectedMember(member)} data-modal-target="popup-modal" data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-700 border-2 border-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2">Delete</button>
                                    </div>

                                    <div id="popup-modal" tabIndex={-1} className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                      <div className="relative p-4 w-full max-w-md max-h-full">
                                        <div className="relative border-2 border-black bg-white rounded-lg shadow-sm">
                                          <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                          </button>
                                          <div className="p-4 md:p-5 text-center">
                                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            <h3 className="mb-5 text-lg font-normal text-black">Are you sure you want to delete this user.</h3>
                                            <button onClick={() => {
                                              if (selectedMember)
                                                handleDelete(selectedMember.email);
                                            }} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                              Yes, I'm sure
                                            </button>
                                            <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">No, cancel</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
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
