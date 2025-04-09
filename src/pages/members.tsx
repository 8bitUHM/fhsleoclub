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
                                  <button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2">Update</button>
                                </div>
                              </> :
                              <p>User is not logged in</p>
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
                        <div key={member.email} className="mb-4 space-y-1 grid grid-rows-subgrid row-span-3">
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
                                    <button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-10">Update</button>
                                  </div>
                                </> :
                                <div className="mt-10">
                                  <p>User is not logged in</p>
                                </div>
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
