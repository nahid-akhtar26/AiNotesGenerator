import { motion } from "framer-motion";

const ToggleBtn = ({ label, checked, onChange }) => {
  return (
    <div 
      onClick={onChange}
      className="flex items-center gap-4 cursor-pointer select-none"
    >
      <motion.div
        animate={{
          backgroundColor: checked
            ? "rgba(34,197,94,0.35)"
            : "rgba(255,255,255,0.15)"
        }}
        transition={{ duration: 0.25 }}
        className="relative w-12 h-6 rounded-full border border-white/20 backdrop-blur-lg"
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
          animate={{
            x: checked ? 24 : 0
          }}
        />
      </motion.div>

      <span
        className={`text-sm transition-colors ${
          checked ? "text-green-500" : "text-gray-300"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

export default ToggleBtn;