import { motion } from "framer-motion";
import { Eye, Upload, LogOut, Clock, Shield } from "lucide-react";
import { Footer } from "./Footer";

interface DashboardProps {
  onView: () => void;
  onUpload: () => void;
  onLogout: () => void;
  timeRemaining: string;
  onDeveloperClick?: () => void;
}

export function Dashboard({ onView, onUpload, onLogout, timeRemaining, onDeveloperClick }: DashboardProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-80 h-80 rounded-full bg-blue-200/30 blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl"
          animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 w-full max-w-4xl flex items-center justify-between mb-8 md:mb-12 px-1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl glass-card flex items-center justify-center">
            <Shield className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-800">Secure Portal</h1>
            <p className="text-[10px] md:text-xs text-gray-500">Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="glass-card rounded-xl px-2.5 md:px-4 py-1.5 md:py-2 flex items-center gap-1.5 md:gap-2">
            <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-500" />
            <span className="text-xs md:text-sm font-medium text-gray-600 tabular-nums">
              {timeRemaining}
            </span>
          </div>
          <button
            onClick={onLogout}
            className="glass-button rounded-xl p-2 md:p-2.5 text-gray-600 hover:text-red-500 transition-colors"
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        </div>
      </motion.div>

      {/* Option Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl px-1">
        <motion.button
          onClick={onView}
          className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-8 text-left group cursor-pointer hover:bg-white/40 transition-all duration-500"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 md:mb-5 group-hover:bg-blue-500/20 transition-colors duration-300">
            <Eye className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1.5 md:mb-2">View Documents</h3>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
            Browse and access PDF documents stored in your secure cloud storage.
          </p>
          <div className="mt-3 md:mt-5 flex items-center gap-2 text-blue-500 text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Explore Files</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              &rarr;
            </motion.span>
          </div>
        </motion.button>

        <motion.button
          onClick={onUpload}
          className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-8 text-left group cursor-pointer hover:bg-white/40 transition-all duration-500"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4 md:mb-5 group-hover:bg-emerald-500/20 transition-colors duration-300">
            <Upload className="w-6 h-6 md:w-8 md:h-8 text-emerald-500" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1.5 md:mb-2">Upload Files</h3>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
            Securely upload new PDF documents to your cloud storage with verification.
          </p>
          <div className="mt-3 md:mt-5 flex items-center gap-2 text-emerald-500 text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Start Upload</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              &rarr;
            </motion.span>
          </div>
        </motion.button>
      </div>

      <Footer onDeveloperClick={onDeveloperClick} />
    </div>
  );
}
