import { motion } from "framer-motion";

export function SuccessAnimation() {
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
            className="check-circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
          />
          <path
            className="check-path"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
        <motion.div
          className="absolute inset-0 rounded-full bg-green-400/20"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
        />
      </div>
      <motion.h2
        className="text-2xl font-semibold text-green-600"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        Access Granted
      </motion.h2>
    </motion.div>
  );
}
