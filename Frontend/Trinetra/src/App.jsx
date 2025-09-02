import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Components/Home/About";
import Contact from "./Pages/Contact";
import EventTimeline from "./Components/Home/EventTimeline";
import Booking from "./Pages/Booking";
import BookingForm from "./Pages/Book";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<EventTimeline/>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/slots" element={<Booking />} />
            <Route path="/book" element={<BookingForm />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
