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

  {/*Test Data. Please delete me before pull request*/ }
  advisors.push(
    { email: "advisor1@example.com", name: "Alice Johnson", role: "Senior Advisor" },

  );

  officers.push(
    { email: "advisor1@example.com", name: "Alice Johnson", role: "Senior Advisor" },
    { email: "advisor2@example.com", name: "Bob Smith", role: "Technical Advisor" },
    { email: "advisor3@example.com", name: "Charlie Davis", role: "Financial Advisor" },
  );

  generalMembers.push(
    { email: "advisor1@example.com", name: "Alice Johnson", role: "Senior Advisor" },
    { email: "advisor2@example.com", name: "Bob Smith", role: "Technical Advisor" },
    { email: "advisor3@example.com", name: "Charlie Davis", role: "Financial Advisor" },
    { email: "advisor4@example.com", name: "Diana Lopez", role: "Legal Advisor" },
    { email: "advisor5@example.com", name: "Ethan Wright", role: "Research Advisor" },
    { email: "advisor6@example.com", name: "Fiona Brown", role: "Marketing Advisor" },
    { email: "advisor7@example.com", name: "George Harris", role: "Operations Advisor" },
    { email: "advisor8@example.com", name: "Hannah Lewis", role: "Strategic Advisor" },
    { email: "advisor9@example.com", name: "Ian Clark", role: "Industry Advisor" },
    { email: "advisor10@example.com", name: "Jessica Hall", role: "Policy Advisor" },
    { email: "advisor11@example.com", name: "Kevin Walker", role: "HR Advisor" },
    { email: "advisor13@example.com", name: "Jevin Walker", role: "JR Advisor" },
  );

  return (
    <>
      <Navbar />
      <Header />

      {/* Advisors Section */}
      <section className="bg-red-900 p-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center pb-6">Meet our Advisors</h2>
        <div className="flex justify-center">

          {/* The main issue is that it's restricted because of grid-cols-4. We need to find a way to make it where it'll only be grid-cols-4 if its 4 or more but if not, then it'd be grid-cols-(That specific amount) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
            {advisors.map((member) => (
              <div key={member.email} className="mb-4">
                <div>{member.name}</div>
                <div>{member.role}</div>
                <div>{member.email}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Officers Section */}
      <section className="p-6 justify">
        <h2 className="text-3xl md:text-4xl font-bold text-center pb-6 text-red-900">Meet our Officers</h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center text-red-900">
            {officers.map((member) => (
              <div key={member.email} className="mb-4">
                <div>{member.name}</div>
                <div>{member.role}</div>
                <div>{member.email}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Members Section */}
      <section className="bg-red-900 p-6 justify">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center pb-6">Meet our Club Members</h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
            {generalMembers.map((member) => (
              <div key={member.email} className="mb-4">
                <div>{member.name}</div>
                <div>{member.role}</div>
                <div>{member.email}</div>
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
