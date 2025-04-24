import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import { clubMembersRefs } from "../lib/dbRefs";
import { onValue } from "firebase/database";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MemberData from "../components/MemberData";
import AddMemberButton from "../components/AddMemberButton";
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
                          <MemberData
                            member={member}
                            setSelectedMember={setSelectedMember}
                            selectedMember={selectedMember}
                          />
                        </div>
                      ))}
                      <AddMemberButton />
                    </div>
                  </section>

                  {/* Officers Section */}
                  <section className="p-6 text-red-900 text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold pb-6">Officers</h2>
                    <div className="grid grid-cols-2 gap-x-4 justify-center items-center md:grid-cols-3 lg:grid-cols-6">
                      {officers.sort((a, b) => Roles[a.role] - Roles[b.role]).map((member) => (
                        <div key={member.email} className="mb-4 space-y-1 grid grid-rows-[auto_auto_auto_auto] items-start">
                          <MemberData
                            member={member}
                            setSelectedMember={setSelectedMember}
                            selectedMember={selectedMember}
                          />
                        </div>
                      ))}
                      <AddMemberButton />
                    </div>
                  </section>

                  {/* General Members Section */}
                  <section className="bg-red-900 p-6 text-white text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold pb-6">Club Members</h2>
                    <div className="flex justify-center">
                      <div className="grid grid-flow-row-dense grid-cols-2 lg:grid-cols-4 place-items-center gap-x-8 gap-y-2">
                        {generalMembers.map((member) => (
                          <div key={member.email} className="mb-4 space-y-1">
                            <MemberData
                              member={member}
                              setSelectedMember={setSelectedMember}
                              selectedMember={selectedMember}
                            />
                          </div>
                        ))}
                        <AddMemberButton />
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
