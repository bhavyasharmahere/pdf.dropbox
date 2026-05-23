import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, User, CaseSensitive, Phone, ArrowRight, Loader2 } from "lucide-react";
import { authenticateUser } from "../data/mockData";
import { SuccessAnimation } from "./SuccessAnimation";
import { ErrorAnimation } from "./ErrorAnimation";
import { Footer } from "./Footer";

interface LoginPageProps {
  onLogin: () => void;
  onDeveloperClick?: () => void;
}

export function LoginPage({ onLogin, onDeveloperClick }: LoginPageProps) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !surname.trim() || !phoneNumber.trim()) return;

    setIsLoading(true);
    setResult(null);

    const response = await authenticateUser(name, surname, phoneNumber);

    setIsLoading(false);
    setResult(response.success ? "success" : "error");

    if (response.success) {
      setTimeout(() => {
        onLogin();
      }, 2000);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full bg-blue-200/30 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-100/20 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Logo / Title */}
      <motion.div
        className="relative z-10 mb-6 md:mb-8 text-center px-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-2">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl glass-card flex items-center justify-center">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            PDF Portal
          </h1>
        </div>
        <p className="text-gray-500 text-xs md:text-sm">Portable Document Format File Management System</p>
      </motion.div>

      {/* Login Card */}
      <motion.div
        className="relative z-10 w-full max-w-md px-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-8">
          <AnimatePresence mode="wait">
            {result === null && (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                  Verify & Continue
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5 ml-1">
                      Registered Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your first name i.e. Riddhi"
                        className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-gray-800 placeholder:text-gray-400 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5 ml-1">
                      Registered Surname
                    </label>
                    <div className="relative">
                      <CaseSensitive className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder="Enter your surname i.e. Kashyap"
                        className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-gray-800 placeholder:text-gray-400 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5 ml-1">
                      Registered Contact Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+1 2484345508"
                        className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-gray-800 placeholder:text-gray-400 text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-6 py-3 px-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Again
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            )}

            {result === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="py-8"
              >
                <SuccessAnimation />
              </motion.div>
            )}

            {result === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="py-8"
              >
                <ErrorAnimation />
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  onClick={() => setResult(null)}
                  className="mt-6 mx-auto block py-2.5 px-6 rounded-xl glass-button text-gray-700 font-medium text-sm hover:text-gray-900"
                >
                  Try Again
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <Footer onDeveloperClick={onDeveloperClick} />
    </div>
  );
}
