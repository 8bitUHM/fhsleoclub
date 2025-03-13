import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../index.css";

export function Index() {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      <main className="min-h-screen">
        {/* What is Leo Club */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-red-900 mb-8 text-center">What is Leo Club?</h2>
            <div className="flex gap-12 items-center">
              <div>
                <p className="text-center text-2xl mb-4">
                The W.R. Farrington High School Leo Club is a school-based 
                community service club sponsored by the Kalakaua Lions. Our club 
                ensures our students have the opportunity to serve their community 
                with great responsibility, all while improving leadership, social, 
                and organizational skills. We aim to help our community and island 
                in any way we can. Community service is our calling!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-red-900 mb-8 text-center">Benefits of Joining</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                'Develop skills as a project organizer, time manager, and team leader.',
                'Learn how teamwork, cooperation, and collaboration can bring exciting changes to your community and the world.',
                'Make friends and feel the rewards of community service.'
              ].map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-2xl font-semibold text-center">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pledge & Motto */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="bg-red-900 text-white text-center p-8 rounded-lg">
                <h3 className="text-3xl font-bold mb-4">Leo Club Pledge</h3>
                <p className="text-2xl italic">
                  "I pledge on my hands, extended and opened to those in need.
                </p>
                <p className="text-2xl italic">
                  I pledge on my heart, reach for it, and it will be touched.
                </p>
                <p className="text-2xl italic">
                  I pledge on my ears, to hear another's out cry.
                </p>
                <p className="text-2xl italic">
                  I pledge on my eyes to see the plight of others.
                </p>
                <p className="text-2xl italic">
                  I pledge on my knowledge to bring a man closer to his dreams.
                </p>
                <p className="text-2xl italic">
                  I pledge on myself for the betterment of my community, my state, and my country."
                </p>
              </div>
              <div className="bg-gray-100 p-8 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-red-900 mb-4">Our Motto</h3>
                <p className="text-3xl font-semibold">Leadership, Experience, Opportunity!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-red-900 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Contact Us</h2>
            <div className="flex-auto justify-center text-center">
              <div className="mb-8">
                <h4 className="text-2xl font-bold mb-4">
                  Email: <a href="farringtonhighschoolleoclub@gmail.com" className="hover:text-gray-200 hover:underline">farringtonhighschoolleoclub@gmail.com</a>
                </h4>
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-4">
                  Follow us on Instagram: <a href="https://www.instagram.com/fhs_leo_club" className="hover:text-gray-200 hover:underline">@fhs_leo_club</a>
                </h4>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Index />
  </StrictMode>
);
