import { motion } from "framer-motion";

export default function AboutSimhastha() {
  return (
    <section
      id="about"
      className="py-16 bg-[#fae7e0] text-gray-900 px-7 flex justify-center"
    >
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-20 items-center">
        
        

        {/* Right Side - Text with scroll animation */}
        <motion.div
          className="text-left"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-10 bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            About Simhastha Mahakumbh
          </h2>
          <p className="text-lg text-justify md:text-xl leading-relaxed text-gray-800">
            Simhastha Mahakumbh is one of the largest spiritual gatherings in the
            world, celebrated once every 12 years in the holy city of Ujjain, on
            the banks of the sacred Shipra river. Millions of devotees and saints
            gather to take a holy dip, which is believed to cleanse sins and
            grant spiritual liberation.
          </p>
          <p className="text-lg text-justify md:text-xl leading-relaxed mt-4 text-gray-800">
            The festival represents faith, unity, and cultural heritage, turning
            Ujjain into a divine confluence of spirituality and tradition.
          </p>
        </motion.div>

        {/* Left Side - Image Box with scroll animation */}
        <motion.div
          className="bg-white shadow-2xl  overflow-hidden "
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="https://www.hindujagruti.org/wp-content/uploads/2015/06/ujjain_900.jpg"
            alt="About Simhastha"
            className="w-full h-[350px] object-cover p-1"
          />
        </motion.div>
      </div>
    </section>
  );
}
