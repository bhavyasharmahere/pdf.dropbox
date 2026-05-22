import { motion } from "framer-motion";
import {
  ArrowLeft,
  Code2,
  GitBranch,
  Mail,
  Globe,
  Layers,
  Cpu,
  Palette,
  Zap,
  Shield,
  Heart,
} from "lucide-react";
import { Footer } from "./Footer";

interface DeveloperPageProps {
  onBack: () => void;
}

const techStack = [
  { name: "React 19", icon: Code2, color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "TypeScript", icon: Cpu, color: "text-sky-500", bg: "bg-sky-500/10" },
  { name: "Vite", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
  { name: "Tailwind CSS", icon: Palette, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { name: "Framer Motion", icon: Layers, color: "text-purple-500", bg: "bg-purple-500/10" },
  { name: "Lucide React", icon: Heart, color: "text-rose-500", bg: "bg-rose-500/10" },
];

export function DeveloperPage({ onBack }: DeveloperPageProps) {
  return (
    <div className="relative h-screen w-full flex flex-col px-4 py-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 rounded-full bg-blue-200/30 blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl"
          animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-100/20 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 w-full max-w-2xl mx-auto flex items-center justify-between mb-6 md:mb-8 px-1 shrink-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={onBack}
          className="glass-button rounded-xl p-2 md:p-2.5 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Developer</h2>
        <div className="w-8 md:w-10" />
      </motion.div>

      {/* Scrollable Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto flex-1 overflow-y-auto scrollbar-hide">
        <div className="flex flex-col items-center pb-8">
          {/* Profile Card */}
          <motion.div
            className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 w-full text-center mb-5 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15, delay: 0.2 }}
            >
              <Code2 className="w-10 h-10 md:w-12 md:h-12 text-blue-500" />
            </motion.div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
              Portal Dev Team
            </h3>
            <p className="text-xs md:text-sm text-gray-500 mb-4">
              Full-Stack Developer & UI Engineer
            </p>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
              Building secure, modern, and delightful web experiences with
              cutting-edge technologies and thoughtful design.
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            className="w-full mb-5 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 md:mb-4 px-1">
              Tech Stack
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
              {techStack.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    className="glass-card rounded-xl md:rounded-2xl p-3 md:p-4 flex items-center gap-2.5 md:gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + index * 0.05 }}
                  >
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl ${tech.bg} flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`w-4 h-4 md:w-5 md:h-5 ${tech.color}`} />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-gray-700">
                      {tech.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            className="w-full mb-5 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 md:mb-4 px-1">
              Connect
            </h4>
            <div className="space-y-2 md:space-y-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-xl md:rounded-2xl p-3 md:p-4 flex items-center gap-3 md:gap-4 hover:bg-white/40 transition-all duration-300 group"
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gray-500/10 flex items-center justify-center group-hover:bg-gray-500/20 transition-colors">
                  <GitBranch className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-medium text-gray-800">GitHub</p>
                  <p className="text-[10px] md:text-xs text-gray-500 truncate">
                    github.com/portal-dev-team
                  </p>
                </div>
                <span className="text-gray-400 text-xs md:text-sm">&rarr;</span>
              </a>

              <a
                href="mailto:dev@secureportal.com"
                className="glass-card rounded-xl md:rounded-2xl p-3 md:p-4 flex items-center gap-3 md:gap-4 hover:bg-white/40 transition-all duration-300 group"
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-medium text-gray-800">Email</p>
                  <p className="text-[10px] md:text-xs text-gray-500 truncate">
                    dev@secureportal.com
                  </p>
                </div>
                <span className="text-gray-400 text-xs md:text-sm">&rarr;</span>
              </a>

              <a
                href="https://secureportal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-xl md:rounded-2xl p-3 md:p-4 flex items-center gap-3 md:gap-4 hover:bg-white/40 transition-all duration-300 group"
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <Globe className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-medium text-gray-800">Website</p>
                  <p className="text-[10px] md:text-xs text-gray-500 truncate">
                    secureportal.com
                  </p>
                </div>
                <span className="text-gray-400 text-xs md:text-sm">&rarr;</span>
              </a>
            </div>
          </motion.div>

          {/* About this Project */}
          <motion.div
            className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-6 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Shield className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
              <h4 className="text-sm md:text-base font-semibold text-gray-800">
                About this Project
              </h4>
            </div>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              Secure Portal is a protected document management system built with
              modern web technologies. It features glassmorphism UI design, session
              management, custom PDF rendering, multi-select downloads, drag-and-drop
              uploads, and real-time authentication — all wrapped in a smooth,
              animated user experience.
            </p>
            <div className="mt-3 md:mt-4 flex items-center gap-1.5 text-[10px] md:text-xs text-gray-400">
              <Heart className="w-3 h-3 text-rose-400" />
              <span>Built with passion and attention to detail</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="shrink-0">
        <Footer />
      </div>
    </div>
  );
}
