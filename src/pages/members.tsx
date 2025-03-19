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

  return (
    <>
      <Navbar />
      <Header />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Leo Club Members</h1>

        {/* Advisors Section */}
        <section>
          <h2 className="text-xl font-semibold">Advisors</h2>
          <ul>
            {advisors.map((member) => (
              <li key={member.email}>{member.name} - {member.role} ({member.email})</li>
            ))}
          </ul>
        </section>

        {/* Officers Section */}
        <section>
          <h2 className="text-xl font-semibold">Student Officers</h2>
          <ul>
            {officers.map((member) => (
              <li key={member.email}>{member.name} - {member.role} ({member.email})</li>
            ))}
          </ul>
        </section>

        {/* General Members Section */}
        <section>
          <h2 className="text-xl font-semibold">Club Members</h2>
          <ul>
            {generalMembers.map((member) => (
              <li key={member.email}>{member.name} - {member.role} ({member.email})</li>
            ))}
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Members />
  </StrictMode>
);
