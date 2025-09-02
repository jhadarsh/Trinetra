import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#fae7e0] text-gray-800 pt-12 pb-6  relative">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Left - Brand */}
        <div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Trinetra
          </h2>
          <p className="mt-3 text-gray-700">
            AI-powered suspicious activity detection for safe and smart crowd
            management.
          </p>
        </div>

        {/* Center - Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:text-orange-600">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-orange-600">
                About
              </a>
            </li>
            <li>
              <a href="#timeline" className="hover:text-orange-600">
                Event Timeline
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-orange-600">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right - Socials */}
        <div>
          <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-orange-600">
              <Facebook />
            </a>
            <a href="#" className="hover:text-orange-600">
              <Twitter />
            </a>
            <a href="#" className="hover:text-orange-600">
              <Instagram />
            </a>
            <a href="#" className="hover:text-orange-600">
              <Linkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 border-t border-gray-300 pt-6 text-center text-gray-600">
        <p>© {new Date().getFullYear()} Trinetra. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
