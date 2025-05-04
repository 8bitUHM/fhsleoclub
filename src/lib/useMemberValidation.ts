import { useState } from "react";
import { get } from "firebase/database";
import { clubMembersRefs, getChildRef } from "../lib/dbRefs";

export const useMemberValidation = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Test error message");
  const [showMessage, setShowMessage] = useState(false);

  const checkIfMemberExists = async (email: string) => {
    const emailKey = email.replace(/\./g, "_");
    const memberRef = getChildRef(clubMembersRefs, emailKey);

    const snapshot = await get(memberRef);

    if (snapshot.exists()) {
      setShowMessage(true);
      setMessage("A member with this email already exists.");
      setLoading(false);
      return true;
    }

    return false;
  };

  return {
    loading,
    message,
    showMessage,
    setLoading,
    setMessage,
    setShowMessage,
    checkIfMemberExists,
  };
};
