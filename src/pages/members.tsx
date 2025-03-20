import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import { clubMembersRefs } from "../lib/dbRefs";
import { onValue } from "firebase/database";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../index.css";

type Member = {
  email: string;
  name: string;
  role: string;
};

export function Members() {

  const [members, setMembers] = useState<Record<string, Member>>({});

  useEffect(() => {
    initFlowbite();

    const unsubscribe = onValue(clubMembersRefs, (snapshot) => {
      if (snapshot.exists()) {
        setMembers(snapshot.val());
      } else {
        setMembers({});
      }
    });

    return () => unsubscribe();
  }, []);

  const categorizeMembers = (members: Record<string, Member>) => {
    const advisors: Member[] = [];
    const officers: Member[] = [];
    const generalMembers: Member[] = [];

    Object.values(members).forEach((member) => {
      if (member.role.toLowerCase() === "club advisor") {
        advisors.push(member);
      } else if (
        ["president", "vice president", "secretary", "treasurer"].includes(member.role.toLowerCase())
      ) {
        officers.push(member);
      } else {
        generalMembers.push(member);
      }
    });

    return { advisors, officers, generalMembers };
  };

  const { advisors, officers, generalMembers } = categorizeMembers(members);

  {/*Test Data. Please delete me before merging onto main*/ }
  advisors.push(
    { email: "advisor1@example.com", name: "Alice Johnson", role: "Senior Advisor" },
  );

  officers.push(
    { email: "vicepresident@example.com", name: "Ipsum Lorem", role: "Vice President" },
    { email: "secretary@example.com", name: "Jane Smith", role: "Secretary" },
    { email: "treasurer@example.com", name: "Mark Johnson", role: "Treasurer" }
  );

  generalMembers.push(
    { email: "member1@example.com", name: "Alice Green", role: "Member" },
    { email: "member2@example.com", name: "Bob White", role: "Member" },
    { email: "member3@example.com", name: "Charlie Blue", role: "Member" },
    { email: "member4@example.com", name: "Diana Red", role: "Member" },
    { email: "member5@example.com", name: "Edward Black", role: "Member" },
    { email: "member6@example.com", name: "Fiona Grey", role: "Member" },
    { email: "member7@example.com", name: "George Yellow", role: "Member" },
    { email: "member8@example.com", name: "Hannah Pink", role: "Member" },
    { email: "member9@example.com", name: "Isaac Purple", role: "Member" },
    { email: "member10@example.com", name: "Jack Brown", role: "Member" },
    { email: "member11@example.com", name: "Kylie Orange", role: "Member" },
    { email: "member12@example.com", name: "Liam Silver", role: "Member" }
  );
  // Test data code ends here

  const advisorLength = advisors.length < 4 ? advisors.length : 4;

  return (
    <>
      <Navbar />
      <Header />

      {/* Advisors Section */}
      <section className="bg-red-900 p-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center pb-6">Meet our Advisors</h2>
        <div className="flex justify-center">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${advisorLength} gap-14 text-center text-white`}>
            {advisors.map((member) => (
              <div key={member.email} className="mb-4">
                <div>{member.name}</div>
                <div className="capitalize">{member.role}</div>
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

      {/* Officers Section */}
      <section className="p-6 justify">
        <h2 className="text-3xl md:text-4xl font-bold text-center pb-6 text-red-900">Meet our Officers</h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 text-center text-red-900">
            {officers.map((member) => (
              <div key={member.email} className="mb-4">
                <div>{member.name}</div>
                <div className="capitalize">{member.role}</div>
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

      {/* General Members Section */}
      <section className="bg-red-900 p-6 justify">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center pb-6">Meet our Club Members</h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14 text-center text-white">
            {generalMembers.map((member) => (
              <div key={member.email} className="mb-4">
                <div>{member.name}</div>
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
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Members />
  </StrictMode>
);
