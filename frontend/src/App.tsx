import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";
import { PdfList } from "./components/PdfList";
import { PdfViewer } from "./components/PdfViewer";
import { UploadPage } from "./components/UploadPage";
import { DeveloperPage } from "./components/DeveloperPage";
import { useSession } from "./hooks/useSession";
import type { PdfFile } from "./data/mockData";

type Page = "login" | "dashboard" | "pdfList" | "pdfViewer" | "upload";

export default function App() {
  const { isAuthenticated, login, logout, formatTimeRemaining } = useSession();
  const [currentPage, setCurrentPage] = useState<Page>(
    isAuthenticated ? "dashboard" : "login"
  );
  const [selectedPdf, setSelectedPdf] = useState<PdfFile | null>(null);
  const [showDeveloper, setShowDeveloper] = useState(false);

  const handleLogin = useCallback(() => {
    login();
    setCurrentPage("dashboard");
  }, [login]);

  const handleLogout = useCallback(() => {
    logout();
    setCurrentPage("login");
    setSelectedPdf(null);
  }, [logout]);

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const handleViewPdf = useCallback((pdf: PdfFile) => {
    setSelectedPdf(pdf);
    setCurrentPage("pdfViewer");
  }, []);

  const openDeveloper = useCallback(() => {
    setShowDeveloper(true);
  }, []);

  const closeDeveloper = useCallback(() => {
    setShowDeveloper(false);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {showDeveloper && (
          <motion.div
            key="developer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <DeveloperPage onBack={closeDeveloper} />
          </motion.div>
        )}

        {!showDeveloper && currentPage === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <LoginPage onLogin={handleLogin} onDeveloperClick={openDeveloper} />
          </motion.div>
        )}

        {!showDeveloper && currentPage === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <Dashboard
              onView={() => navigateTo("pdfList")}
              onUpload={() => navigateTo("upload")}
              onLogout={handleLogout}
              timeRemaining={formatTimeRemaining()}
              onDeveloperClick={openDeveloper}
            />
          </motion.div>
        )}

        {!showDeveloper && currentPage === "pdfList" && (
          <motion.div
            key="pdfList"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <PdfList
              onBack={() => navigateTo("dashboard")}
              onViewPdf={handleViewPdf}
              onDeveloperClick={openDeveloper}
            />
          </motion.div>
        )}

        {!showDeveloper && currentPage === "pdfViewer" && selectedPdf && (
          <motion.div
            key="pdfViewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <PdfViewer
              pdf={selectedPdf}
              onBack={() => navigateTo("pdfList")}
              onDeveloperClick={openDeveloper}
            />
          </motion.div>
        )}

        {!showDeveloper && currentPage === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <UploadPage
              onBack={() => navigateTo("dashboard")}
              onDeveloperClick={openDeveloper}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
