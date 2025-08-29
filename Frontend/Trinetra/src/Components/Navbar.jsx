import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Trinetra</h1>
      <ul className="flex space-x-6">
        <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
        <li><Link to="/about" className="hover:text-yellow-300">About</Link></li>
        <li><Link to="/menu" className="hover:text-yellow-300">Menu</Link></li>
        <li><Link to="/contact" className="hover:text-yellow-300">Contact</Link></li>
      </ul>
    </nav>
  );
}
