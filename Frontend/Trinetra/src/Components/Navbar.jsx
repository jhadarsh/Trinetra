import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Title */}
        <Link to="/">
        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 bg-clip-text text-transparent tracking-wide drop-shadow-md">
          Trinetra
        </h1>
        </Link>

        {/* Links */}
        <ul className="hidden md:flex space-x-10 font-medium">
          {["About", "Events", "Contact"].map((item, idx) => (
            <li key={idx}>
              <a
                href={`/${item.toLowerCase()}`}
                className="relative px-2 py-1 transition group text-black drop-shadow-md"
              >
                {item}
                {/* Underline effect */}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white text-2xl drop-shadow-md focus:outline-none">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}
