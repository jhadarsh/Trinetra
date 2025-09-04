import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Components/Home/About";
import Contact from "./Pages/Contact";
import EventTimeline from "./Components/Home/EventTimeline";
import Booking from "./Pages/Booking";
import BookingForm from "./Pages/Book";
import KumbhMelaMonitor from "./Pages/HeatMap_Dashboard";
import LostAndFoundPage from "./Pages/LostAndFoundPage";
import SafeZonePage from "./Pages/SafeZonePage";

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
            <Route path="/dashboard" element={<KumbhMelaMonitor />} />
            <Route path="/lost-found" element={<LostAndFoundPage />} />
            <Route path="/ar-navigation" element={<SafeZonePage />} />
              
            
          </Routes>
        </main>
        <Footer id="footer"/>
      </div>
    </Router>
  );
}
 
 

export default AppWrapper;
