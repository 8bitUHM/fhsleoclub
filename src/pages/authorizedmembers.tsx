import { StrictMode, } from "react";
import { createRoot } from "react-dom/client";
import { AuthContextProvider } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthMembers from "../components/AuthMembers";
import '../index.css'

export function AuthorizedMembers() {
  
  return(
    <>
      <AuthContextProvider>
        <Navbar />
        <AuthMembers />
      </AuthContextProvider>
      <Footer />
    </>
  )
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthorizedMembers />
    </StrictMode>
)