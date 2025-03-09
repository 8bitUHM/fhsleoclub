import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../index.css";

export function Index() {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-[#800000] text-white py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">FHS Leo Club</h1>
            <p className="text-xl md:text-2xl mb-8">Leadership, Experience, Opportunity</p>
          </div>
        </section>

        {/* What is Leo Club */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#800000] mb-8 text-center">What is Leo Club?</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#800000] mb-8 text-center">Benefits of Joining</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                'Develop skills as a project organizer, time manager, and team leader.',
                'Learn how teamwork, cooperation, and collaboration can bring exciting changes to your community and the world.',
                'Make friends and feel the rewards of community service.'
              ].map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-lg font-semibold">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pledge & Motto */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-[#800000] text-white text-center p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Leo Club Pledge</h3>
                <p className="text-lg italic">
                  "I pledge on my hands, extended and opened to those in need.
                </p>
                <p className="text-lg italic">
                  I pledge on my heart, reach for it, and it will be touched.
                </p>
                <p className="text-lg italic">
                  I pledge on my ears, to hear another's out cry.
                </p>
                <p className="text-lg italic">
                  I pledge on my eyes to see the plight of others.
                </p>
                <p className="text-lg italic">
                  I pledge on my knowledge to bring a man closer to his dreams.
                </p>
                <p className="text-lg italic">
                  I pledge on myself for the betterment of my community, my state, and my country."
                </p>
              </div>
              <div className="bg-gray-100 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-[#800000] mb-4">Our Motto</h3>
                <p className="text-3xl font-semibold">Leadership • Experience • Opportunity!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-[#800000] text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-8 text-center">
              <div>
                <h4 className="text-xl font-bold mb-4">Email</h4>
                <a href="farringtonhighschoolleoclub@gmail.com" className="hover:text-gray-200 hover:underline">farringtonhighschoolleoclub@gmail.com</a>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4">Follow Us</h4>
                <div className="flex items-center me-4 justify-center hover:underline space-x-4">
                  <a href="https://www.instagram.com/fhs_leo_club/" className="hover:text-gray-200">
                    <svg className="w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd"></path></svg>
                  </a>
                </div>
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
