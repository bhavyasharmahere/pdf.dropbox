import { motion } from "framer-motion";

export function ErrorAnimation() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-4"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div className="relative w-24 h-24">
        <svg
          className="w-full h-full"
          viewBox="0 0 52 52"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="cross-circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
          />
          <path
            className="cross-path-1"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 16l20 20"
          />
          <path
            className="cross-path-2"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M36 16L16 36"
          />
        </svg>
        <motion.div
          className="absolute inset-0 rounded-full bg-red-400/20"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
        />
      </div>
      <motion.h2
        className="text-2xl font-semibold text-red-500"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        Kindly Verify Your Details
      </motion.h2>
    </motion.div>
  );
}
