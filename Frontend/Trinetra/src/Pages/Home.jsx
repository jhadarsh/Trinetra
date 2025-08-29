import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div 
      className="p-10 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold mb-4">Welcome to Trinetra</h2>
      <p className="text-lg">This is the Home page. Navigate using the navbar above.</p>
    </motion.div>
  );
}
