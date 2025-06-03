import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/config";
import { authorizedMembersRef, getChildRef } from "../lib/dbRefs";
import { get } from "@firebase/database";

export interface UserData {
  admin: boolean;
  can_login: boolean;
}
export interface UserProps {
  data: () => Promise<UserData>
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isReady: boolean;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultValue:UserProps = {
  data: async () => ({ admin: false, can_login: false}),
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

  const data = async () => {
    if (!user) {
      return {
        admin: false,
        can_login: false,
      }
    }

    const value = getChildRef(authorizedMembersRef, user.email!.split('@')[0]);
    const info = await get(value);
    
    return {
      admin: info.child('admin').val() as boolean,
      can_login: info.child('admin').val() as boolean,
    }

  }
  
  return (
    <AuthContext.Provider
      value={{
        data,
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