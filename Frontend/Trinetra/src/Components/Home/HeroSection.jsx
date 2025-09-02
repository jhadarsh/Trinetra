import { motion } from "framer-motion";
import Background from "../../assets/Simhastha-video3.mp4";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center  overflow-hidden"
    >
      {/* Full Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover "
      >
        <source src={Background} type="video/mp4" />
      </video>

      {/* Overlay gradient for text visibility */}

      {/* Left Aligned Content */}
      <div className="relative z-20 ml-5 mt-7 flex flex-col items-start text-left pl-0 md:pl-0 lg:pl-0 max-w-3xl">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-2xl  md:text-6xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 via-purple-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg"
        >
          Simhastha Ujjain Mahakumbh
        </motion.h1>

        {/* Sub Heading "2028" */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className="mt-2 text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-400 via-purple-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg"
        >
          2028
        </motion.h2>

        {/* Short Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-4 text-base  md:text-lg lg:text-xl text-black-200 max-w-xl"
        >
          Join millions of devotees in the grand spiritual gathering at Ujjain.  
          Experience tradition, devotion, and unity at the sacred banks of Shipra.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          className="mt-8"
        >
          <Link
            to="/slots"
            className="px-8 py-3 rounded-full text-lg font-semibold bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-transform"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
