import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/config";

export interface UserProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isReady: boolean;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultValue:UserProps = {
  user: null,
  setUser: () => null,
  isReady: false, 
  setIsReady: () => false,
};

const AuthContext = createContext<UserProps>(defaultValue);

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children })  => {

  const [ user, setUser ] = useState<User | null>(null);
  const [ isReady, setIsReady ] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsReady(true);
    })

    return () => unsubscribe();
  }, []);
  
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isReady,
        setIsReady
      }}
    >
      { isReady && 
        <>
          {children}
        </>
      }
    </AuthContext.Provider>
  )
}

export { AuthContextProvider };
export default AuthContext;