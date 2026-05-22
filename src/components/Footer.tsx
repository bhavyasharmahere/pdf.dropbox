import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

interface FooterProps {
  onDeveloperClick?: () => void;
}

export function Footer({ onDeveloperClick }: FooterProps) {
  return (
    <motion.footer
      className="relative z-10 w-full py-4 md:py-5 text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-1 md:gap-1.5">
        <p className="text-[10px] md:text-[11px] text-gray-400 tracking-wide">
          &copy; {new Date().getFullYear()} Secure Portal. All rights reserved.
        </p>
        <button
          onClick={onDeveloperClick}
          className="inline-flex items-center gap-1 text-[10px] md:text-[11px] text-gray-400 hover:text-blue-500 transition-colors duration-300 group cursor-pointer"
        >
          <span>Developed by</span>
          <span className="font-medium text-gray-500 group-hover:text-blue-500 transition-colors">
            Portal Dev Team
          </span>
          <Code2 className="w-2.5 h-2.5 md:w-3 md:h-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
        </button>
      </div>
    </motion.footer>
  );
}
