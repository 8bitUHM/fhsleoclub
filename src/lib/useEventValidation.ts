import { useState } from "react";
import { get } from "firebase/database";
import { eventRefs, getChildRef } from "../lib/dbRefs";

export const useEventValidation = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Test error message");
  const [showMessage, setShowMessage] = useState(false);

  const checkIfEventExists = async (title: string) => {
    const titleKey = title.replace(/\./g, "_");
    const eventRef = getChildRef(eventRefs, titleKey);

    const snapshot = await get(eventRef);

    if (snapshot.exists()) {
      setShowMessage(true);
      setMessage("An event with this title already exists.");
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
    checkIfEventExists,
  };
};
