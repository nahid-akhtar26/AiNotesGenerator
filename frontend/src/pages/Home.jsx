import Navbar from "../components/Navbar";
import { motion } from "motion/react";
import img from "../assets/img1.png";
import Footer from "../components/Footer";
import Feature from "../components/Feature";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className=" min-h-screen overflow-hidden bg-white text-black">
      <Navbar />

      <section className="max-w-7xl mx-auto px-8 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ rotate: 6, rotateY: -6 }}
          className="transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.h1
            className="text-5xl lg:text-6xl font-extrabold leading-tight bg-linear-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent"
            whileHover={{ y: -4 }}
            style={{
              transform: "translateZ(40px)",
              textShadow: "0 18px 40px rgba(0,0,0,0.25)",
            }}
          >
            Create Smart <br /> AI Notes in Seconds
          </motion.h1>

          <motion.p
            whileHover={{ y: -2 }}
            className="mt-6 mx-w-xl text-lg bg-linear-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent"
            style={{
              transform: "translate(40px)",
              textShadow: "0 10px 40 px rgba(0,0,0,0.25)",
            }}
          >
            Generate exam-focused notes, project documentation, flow diagrams
            and revision-ready content using AI - faster, cleaner and smarter.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{
            y: -12,
            rotateX: 8,
            rotateY: -8,
            scale: 1.05,
          }}
          className="transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="overflow-hidden">
            <img
              src={img}
              alt="img"
              style={{ transform: "translateZ(35px)" }}
            />
          </div>
        </motion.div>
        <div className="mt-10 inline-block">
  <motion.button
    onClick={() => navigate("/notes")}
    className="px-6 py-2 rounded-lg flex items-center gap-2 bg-linear-to-br from-black/90 via-black/80 to-black/90 border border-white/10 text-white font-medium text-sm shadow-md"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    Get Started
  </motion.button>
</div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-4 gap-10">
        <Feature
          icon="📘"
          title="Exam Notes"
          des="High-yield exam-oriented notes with revision points."
        />
        <Feature
          icon="📂"
          title="Project Notes"
          des="Well-structured content for assignments and projects."
        />
        <Feature
          icon="📊"
          title="Diagrams"
          des="Auto-generated visul diagrams for clarity."
        />
        <Feature
          icon="⬇️"
          title="PDF Download"
          des="Download clean, printable PDFs instantly"
        />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
