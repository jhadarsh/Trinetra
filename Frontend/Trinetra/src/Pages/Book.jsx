import axios from "axios";
import { useState, useEffect } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    aadhaarNumber: "",
    slotId: "",
    numberOfPeople: 1,
  });

  const [slots, setSlots] = useState([]); // store available slots

  // Fetch slots from backend when component loads
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/slots"); // your GET route
        setSlots(response.data); // assuming response.data is array of slots
      } catch (error) {
        console.error("❌ Error fetching slots:", error.message);
      }
    };

    fetchSlots();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/slots/book", {
        user: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          aadhaarNumber: formData.aadhaarNumber,
        },
        slot: formData.slotId, // selected slotId
        bookingDetails: {
          numberOfPeople: formData.numberOfPeople,
        },
      });

      console.log("✅ Booking successful:", response.data);
      alert("Booking created successfully!");
    } catch (error) {
      console.error("❌ Booking failed:", error.response?.data || error.message);
      alert("Booking failed: " + (error.response?.data?.message || "Server error"));
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl space-y-4"
    >
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="aadhaarNumber"
        placeholder="Aadhaar Number"
        value={formData.aadhaarNumber}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Dropdown for slot selection */}
      <select
        name="slotId"
        value={formData.slotId}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Select a Slot --</option>
        {slots.map((slot) => (
          <option key={slot._id} value={slot._id}>
            {slot.date} 
          </option>
        ))}
      </select>

      <input
        type="number"
        name="numberOfPeople"
        placeholder="Number of People"
        value={formData.numberOfPeople}
        onChange={handleChange}
        required
        min="1"
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Book Slot
      </button>
    </form>
  );
}
