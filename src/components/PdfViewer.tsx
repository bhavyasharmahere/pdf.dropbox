import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  RotateCw,
  Download,
  Loader2,
} from "lucide-react";
import type { PdfFile } from "../data/mockData";
import { Footer } from "./Footer";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

interface PdfViewerProps {
  pdf: PdfFile;
  onBack: () => void;
  onDeveloperClick?: () => void;
}

export function PdfViewer({ pdf, onBack, onDeveloperClick }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [rotation, setRotation] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [containerWidth, setContainerWidth] = useState<number>(800);
  const [pageInput, setPageInput] = useState<string>("1");

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const updateWidth = () => {
        setContainerWidth(node.clientWidth - 48);
      };
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      setPageInput(String(pageNumber - 1));
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
      setPageInput(String(pageNumber + 1));
    }
  };

  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5));
  const rotate = () => setRotation((r) => (r + 90) % 360);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = parseInt(pageInput, 10);
      if (!isNaN(page) && page >= 1 && page <= numPages) {
        setPageNumber(page);
      } else {
        setPageInput(String(pageNumber));
      }
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdf.url;
    link.download = pdf.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      className={`relative flex flex-col bg-gradient-to-br from-slate-50 to-gray-100 ${
        isFullscreen ? "fixed inset-0 z-50" : "min-h-screen w-full"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top Bar */}
      <div className="glass-card border-b border-white/40 px-2 md:px-4 py-2 md:py-3 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <button
            onClick={onBack}
            className="p-1.5 md:p-2 rounded-xl hover:bg-white/50 transition-colors text-gray-600 shrink-0"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <div className="min-w-0">
            <h3 className="text-xs md:text-sm font-semibold text-gray-800 max-w-[120px] md:max-w-md truncate">
              {pdf.fileName}
            </h3>
            <p className="text-[10px] md:text-xs text-gray-500">
              Page {pageNumber} of {numPages || "..."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-0.5 md:gap-1.5 shrink-0">
          <button
            onClick={zoomOut}
            className="p-1.5 md:p-2 rounded-xl hover:bg-white/50 transition-colors text-gray-600"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <span className="text-[10px] md:text-xs font-medium text-gray-600 w-9 md:w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="p-1.5 md:p-2 rounded-xl hover:bg-white/50 transition-colors text-gray-600"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <div className="w-px h-4 md:h-5 bg-gray-300 mx-0.5 md:mx-1 hidden sm:block" />
          <button
            onClick={rotate}
            className="p-1.5 md:p-2 rounded-xl hover:bg-white/50 transition-colors text-gray-600 hidden sm:block"
            title="Rotate"
          >
            <RotateCw className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            onClick={handleDownload}
            className="p-1.5 md:p-2 rounded-xl hover:bg-white/50 transition-colors text-gray-600"
            title="Download"
          >
            <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-1.5 md:p-2 rounded-xl hover:bg-white/50 transition-colors text-gray-600"
            title="Fullscreen"
          >
            {isFullscreen ? (
              <Minimize className="w-3.5 h-3.5 md:w-4 md:h-4" />
            ) : (
              <Maximize className="w-3.5 h-3.5 md:w-4 md:h-4" />
            )}
          </button>
        </div>
      </div>

      {/* PDF Content */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto flex items-start justify-center p-3 md:p-6"
      >
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loader"
              className="flex items-center justify-center h-96"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>

        <Document
          file={pdf.url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={null}
          error={
            <div className="text-center py-12">
              <p className="text-gray-500">Failed to load PDF.</p>
            </div>
          }
        >
          <motion.div
            key={`${pageNumber}-${scale}-${rotation}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
              width={containerWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-2xl rounded-lg overflow-hidden"
            />
          </motion.div>
        </Document>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="glass-card border-t border-white/40 px-3 md:px-4 py-2 md:py-3 flex items-center justify-center gap-3 md:gap-4 shrink-0 z-20">
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          className="p-1.5 md:p-2 rounded-xl hover:bg-white/50 transition-colors text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <div className="flex items-center gap-1.5 md:gap-2">
          <input
            type="text"
            value={pageInput}
            onChange={handlePageInputChange}
            onKeyDown={handlePageInputSubmit}
            onBlur={() => setPageInput(String(pageNumber))}
            className="w-10 md:w-12 text-center py-1 md:py-1.5 px-1.5 md:px-2 rounded-lg glass-input text-xs md:text-sm text-gray-800"
          />
          <span className="text-xs md:text-sm text-gray-500">/ {numPages}</span>
        </div>

        <button
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
          className="p-1.5 md:p-2 rounded-xl hover:bg-white/50 transition-colors text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>

      <Footer onDeveloperClick={onDeveloperClick} />
    </motion.div>
  );
}
