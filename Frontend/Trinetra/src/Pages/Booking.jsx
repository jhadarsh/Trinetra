import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Ticket } from "lucide-react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function Booking() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch API data with axios
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/slots");
        setSlots(res.data);
      } catch (err) {
        console.error("Error fetching slots:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <p className="text-lg font-semibold text-gray-700 animate-pulse">
          Loading slots...
        </p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-[#fae7e0]" id="slots">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-4xl font-extrabold mb-12 text-center bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          Book Your Snan Slot
        </h2>

        {/* Slot Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {slots.map((slot, idx) => {
            const filled = (slot.booked / slot.capacity) * 100;
            const isFull = slot.status === "Full";

            return (
              <motion.div
                key={slot._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-2xl shadow-lg p-6 bg-white relative border-l-4 ${
                  isFull ? "border-red-500" : "border-orange-500"
                }`}
              >
                {/* Date & Time */}
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <span className="font-medium">
                    {new Date(slot.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <p className="text-lg font-semibold text-gray-800">
                  {slot.time}
                </p>

                {/* Ghat */}
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span>{slot.ghat}</span>
                </div>

                {/* Capacity */}
                <div className="flex items-center gap-2 text-gray-600 mt-4">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>
                    {slot.booked} / {slot.capacity} booked
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div
                    className={`h-2 rounded-full ${
                      isFull
                        ? "bg-red-500"
                        : "bg-gradient-to-r from-orange-500 to-purple-600"
                    }`}
                    style={{ width: `${filled}%` }}
                  ></div>
                </div>

                {/* Status */}
                <p
                  className={`mt-3 font-semibold ${
                    isFull ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {slot.status}
                </p>

                {/* Book Now Button */}
                <Link to="/book">
                <button
                  disabled={isFull}
                  className={`mt-5 flex items-center gap-2 px-4 py-2 w-full justify-center rounded-xl font-medium text-white transition ${
                    isFull
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-purple-600 hover:scale-105"
                  }`}
                >
                  <Ticket className="w-5 h-5" />
                  {isFull ? "Fully Booked" : "Book Now"}
                </button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
 