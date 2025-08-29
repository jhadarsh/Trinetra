import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div 
      className="p-10 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold mb-4">About Us</h2>
      <p className="text-lg">This is the About page where you can learn more about Trinetra.</p>
    </motion.div>
  );
}
