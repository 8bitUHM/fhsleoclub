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
            <a href="#join" className="bg-white text-[#800000] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Join Now
            </a>
          </div>
        </section>

        {/* What is Leo Club */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#800000] mb-8 text-center">What is Leo Club?</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg mb-4">
                  The Leo Club is a youth organization of Lions Clubs International that provides young people with 
                  opportunities for development and contribution through community service.
                </p>
                <p className="text-lg">
                  Open to all Farrington High School students, we focus on building leadership skills through 
                  volunteer work, team activities, and personal development workshops.
                </p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1582213184778-3b508709fd4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Students volunteering"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#800000] mb-8 text-center">Benefits of Joining</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                'Develop leadership skills',
                'Community service hours',
                'College application boost',
                'Make new friends',
                'Professional networking',
                'Personal growth opportunities'
              ].map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-[#800000] rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
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
              <div className="bg-[#800000] text-white p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Leo Club Pledge</h3>
                <p className="text-lg italic">
                  "I pledge allegiance to Leoism and to the principles it upholds... To aid those in need, 
                  to promote understanding, and through my service, to encourage peace and prosperity for all."
                </p>
              </div>
              <div className="bg-gray-100 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-[#800000] mb-4">Our Motto</h3>
                <p className="text-3xl font-semibold">Leadership • Experience • Opportunity</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-[#800000] text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Contact Us</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="text-xl font-bold mb-4">Email</h4>
                <a href="mailto:fhsleoclub@example.com" className="hover:text-gray-200">fhsleoclub@example.com</a>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4">Meeting Times</h4>
                <p>Every Wednesday</p>
                <p>3:00 PM - 4:30 PM</p>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4">Follow Us</h4>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="hover:text-gray-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href="#" className="hover:text-gray-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg>
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
