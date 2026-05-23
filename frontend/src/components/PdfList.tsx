import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Calendar,
  User,
  HardDrive,
  Layers,
  ArrowLeft,
  Eye,
  Download,
  Loader2,
  X,
  Check,
  Trash2,
  Search,
} from "lucide-react";
import { fetchPdfFiles, type PdfFile } from "../data/mockData";
import { Footer } from "./Footer";

interface PdfListProps {
  onBack: () => void;
  onViewPdf: (pdf: PdfFile) => void;
  onDeveloperClick?: () => void;
}

export function PdfList({ onBack, onViewPdf, onDeveloperClick }: PdfListProps) {
  const [pdfs, setPdfs] = useState<PdfFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState<PdfFile | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectionMode, setSelectionMode] = useState(false);
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadPdfs();
  }, []);

  const loadPdfs = async () => {
    setIsLoading(true);
    const files = await fetchPdfFiles();
    setPdfs(files);
    setIsLoading(false);
  };

  const filteredPdfs = useMemo(() => {
    if (!searchQuery.trim()) return pdfs;
    const query = searchQuery.toLowerCase().trim();
    return pdfs.filter(
      (pdf) =>
        pdf.fileName.toLowerCase().includes(query) ||
        pdf.author.toLowerCase().includes(query) ||
        pdf.date.includes(query) ||
        pdf.size.toLowerCase().includes(query)
    );
  }, [pdfs, searchQuery]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    const allVisibleSelected = filteredPdfs.every((p) => selectedIds.has(p.id));
    if (allVisibleSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filteredPdfs.forEach((p) => next.delete(p.id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filteredPdfs.forEach((p) => next.add(p.id));
        return next;
      });
    }
  };

  const exitSelectionMode = () => {
    setSelectionMode(false);
    setSelectedIds(new Set());
  };

  const handleDownload = (pdf: PdfFile) => {
    const link = document.createElement("a");
    link.href = pdf.url;
    link.download = pdf.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBulkDownload = async () => {
    const selectedPdfs = pdfs.filter((p) => selectedIds.has(p.id));
    setDownloadingIds(new Set(selectedIds));

    for (const pdf of selectedPdfs) {
      handleDownload(pdf);
      await new Promise((resolve) => setTimeout(resolve, 400));
    }

    setDownloadingIds(new Set());
    exitSelectionMode();
  };

  const handleCardClick = (pdf: PdfFile) => {
    if (selectionMode) {
      toggleSelection(pdf.id);
    } else {
      setSelectedPdf(pdf);
    }
  };

  const isAllSelected =
    filteredPdfs.length > 0 && filteredPdfs.every((p) => selectedIds.has(p.id));

  return (
    <div className="relative h-screen w-full flex flex-col px-4 py-4 md:py-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-80 h-80 rounded-full bg-blue-200/30 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between mb-3 md:mb-4 px-1 shrink-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={selectionMode ? exitSelectionMode : onBack}
          className="glass-button rounded-xl p-2 md:p-2.5 text-gray-600 hover:text-gray-800 transition-colors"
        >
          {selectionMode ? (
            <X className="w-4 h-4 md:w-5 md:h-5" />
          ) : (
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          )}
        </button>

        <h2 className="text-lg md:text-2xl font-bold text-gray-800">
          {selectionMode ? `${selectedIds.size} Selected` : "Documents"}
        </h2>

        <button
          onClick={() => {
            if (selectionMode) {
              exitSelectionMode();
            } else {
              setSelectionMode(true);
            }
          }}
          className={`glass-button rounded-xl px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-medium transition-all duration-300 ${
            selectionMode
              ? "bg-red-500/10 text-red-600 border-red-200/50"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          {selectionMode ? "Cancel" : "Select"}
        </button>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto mb-3 md:mb-4 px-1 shrink-0"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, author, date..."
            className="w-full pl-10 pr-10 py-2.5 md:py-3 rounded-xl glass-input text-gray-800 placeholder:text-gray-400 text-sm"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/50 transition-colors text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Results count */}
        <AnimatePresence>
          {searchQuery && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs text-gray-500 mt-2 ml-1"
            >
              <span className="font-semibold text-gray-700">
                {filteredPdfs.length}
              </span>{" "}
              {filteredPdfs.length === 1 ? "result" : "results"} found
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Select All Bar */}
      <AnimatePresence>
        {selectionMode && (
          <motion.div
            className="relative z-10 w-full max-w-5xl mx-auto mb-3 md:mb-4 px-1 shrink-0"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="glass-card rounded-xl px-3 md:px-4 py-2.5 md:py-3 flex items-center justify-between">
              <button
                onClick={toggleSelectAll}
                className="flex items-center gap-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                    isAllSelected
                      ? "bg-blue-500 border-blue-500"
                      : selectedIds.size > 0
                      ? "bg-blue-500/30 border-blue-400"
                      : "border-gray-300"
                  }`}
                >
                  {isAllSelected && (
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  )}
                  {!isAllSelected && selectedIds.size > 0 && (
                    <div className="w-2 h-2 rounded-sm bg-blue-500" />
                  )}
                </div>
                <span>{isAllSelected ? "Deselect All" : "Select All"}</span>
              </button>

              <AnimatePresence>
                {selectedIds.size > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSelectedIds(new Set())}
                    className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 transition-colors px-2 py-1 rounded-lg hover:bg-red-50/50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Grid */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex-1 overflow-y-auto scrollbar-hide">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : filteredPdfs.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center h-64 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gray-200/50 flex items-center justify-center mb-4">
              <Search className="w-7 h-7 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              {searchQuery
                ? "No documents match your search"
                : "No documents available"}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-blue-500 hover:text-blue-600 font-medium mt-1"
              >
                Clear search
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 pb-8">
            <AnimatePresence>
              {filteredPdfs.map((pdf, index) => {
                const isSelected = selectedIds.has(pdf.id);
                const isDownloading = downloadingIds.has(pdf.id);

                return (
                  <motion.div
                    key={pdf.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.04 }}
                    layout
                    onClick={() => handleCardClick(pdf)}
                    className={`glass-card rounded-xl md:rounded-2xl p-4 md:p-5 cursor-pointer transition-all duration-300 group relative ${
                      isSelected
                        ? "bg-blue-500/10 border-blue-300/50 ring-2 ring-blue-400/30"
                        : "hover:bg-white/40"
                    }`}
                    whileHover={!selectionMode ? { scale: 1.02, y: -2 } : {}}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Selection Checkbox Overlay */}
                    <AnimatePresence>
                      {selectionMode && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="absolute top-3 right-3 md:top-3.5 md:right-3.5 z-10"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelection(pdf.id);
                          }}
                        >
                          <div
                            className={`w-5 h-5 md:w-6 md:h-6 rounded-md md:rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                              isSelected
                                ? "bg-blue-500 border-blue-500 shadow-md shadow-blue-500/25"
                                : "bg-white/60 border-gray-300 hover:border-blue-400"
                            }`}
                          >
                            {isSelected && (
                              <Check
                                className="w-3 h-3 md:w-3.5 md:h-3.5 text-white"
                                strokeWidth={3}
                              />
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Downloading overlay */}
                    <AnimatePresence>
                      {isDownloading && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-20 bg-white/40 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <Loader2 className="w-5 h-5 md:w-6 md:h-6 text-blue-500 animate-spin" />
                            <span className="text-[10px] md:text-xs font-medium text-blue-600">
                              Downloading...
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-start gap-3 md:gap-4">
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                          isSelected
                            ? "bg-blue-500/15"
                            : "bg-red-500/10 group-hover:bg-red-500/20"
                        }`}
                      >
                        <FileText
                          className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${
                            isSelected ? "text-blue-500" : "text-red-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0 pr-5 md:pr-6">
                        <h3 className="text-xs md:text-sm font-semibold text-gray-800 truncate">
                          {pdf.fileName}
                        </h3>
                        <div className="mt-1.5 md:mt-2 space-y-0.5 md:space-y-1">
                          <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-500">
                            <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3" />
                            <span>{pdf.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-500">
                            <User className="w-2.5 h-2.5 md:w-3 md:h-3" />
                            <span className="truncate">{pdf.author}</span>
                          </div>
                          <div className="flex items-center gap-2 md:gap-3 mt-1.5 md:mt-2">
                            <span className="flex items-center gap-1 text-[10px] md:text-xs text-gray-500">
                              <HardDrive className="w-2.5 h-2.5 md:w-3 md:h-3" />
                              {pdf.size}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] md:text-xs text-gray-500">
                              <Layers className="w-2.5 h-2.5 md:w-3 md:h-3" />
                              {pdf.pages} pages
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bulk Action Bar */}
      <AnimatePresence>
        {selectionMode && selectedIds.size > 0 && (
          <motion.div
            className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-3 md:px-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="glass-card rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-2.5 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Download className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-gray-800">
                    {selectedIds.size}{" "}
                    {selectedIds.size === 1 ? "file" : "files"} selected
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-500">Ready to download</p>
                </div>
              </div>
              <button
                onClick={handleBulkDownload}
                disabled={downloadingIds.size > 0}
                className="px-3 md:px-5 py-2 md:py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 md:gap-2 shadow-lg shadow-blue-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {downloadingIds.size > 0 ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 md:w-4 md:h-4 animate-spin" />
                    <span className="hidden md:inline">Downloading...</span>
                    <span className="md:hidden">...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span className="hidden md:inline">Download All</span>
                    <span className="md:hidden">Download</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Modal */}
      <AnimatePresence>
        {selectedPdf && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setSelectedPdf(null)}
            />
            <motion.div
              className="relative glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 w-full max-w-sm mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <button
                onClick={() => setSelectedPdf(null)}
                className="absolute top-3 right-3 md:top-4 md:right-4 p-1.5 rounded-lg hover:bg-white/50 transition-colors text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-red-500/10 flex items-center justify-center mb-3 md:mb-4">
                  <FileText className="w-7 h-7 md:w-8 md:h-8 text-red-500" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1">
                  {selectedPdf.fileName}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mb-5 md:mb-6">
                  {selectedPdf.pages} pages &middot; {selectedPdf.size}
                </p>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => {
                      setSelectedPdf(null);
                      onViewPdf(selectedPdf);
                    }}
                    className="flex-1 py-2.5 md:py-3 px-3 md:px-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
                  >
                    <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    View
                  </button>
                  <button
                    onClick={() => {
                      handleDownload(selectedPdf);
                      setSelectedPdf(null);
                    }}
                    className="flex-1 py-2.5 md:py-3 px-3 md:px-4 rounded-xl glass-button text-gray-700 font-medium text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="shrink-0">
        <Footer onDeveloperClick={onDeveloperClick} />
      </div>
    </div>
  );
}
