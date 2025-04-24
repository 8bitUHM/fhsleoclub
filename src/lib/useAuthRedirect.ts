import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/config";

const useAuthRedirect = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.email === undefined) {
        window.location.href = "/";
      }
    });

    return () => unsubscribe();
  }, []);
};

export default useAuthRedirect;
