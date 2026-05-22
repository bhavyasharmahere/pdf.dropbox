import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CloudSync,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { uploadPdfFile } from "../data/mockData";
import { Footer } from "./Footer";

interface UploadPageProps {
  onBack: () => void;
  onDeveloperClick?: () => void;
}

export function UploadPage({ onBack, onDeveloperClick }: UploadPageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "verifying" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setErrorMessage("Only PDF files are allowed.");
      return false;
    }
    if (file.size > 50 * 1024 * 1024) {
      setErrorMessage("File size must be less than 50MB.");
      return false;
    }
    return true;
  };

  const handleFile = (file: File) => {
    setErrorMessage("");
    if (validateFile(file)) {
      setSelectedFile(file);
      setUploadStatus("idle");
    } else {
      setUploadStatus("error");
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadStatus("uploading");
    setUploadProgress(0);

    const result = await uploadPdfFile(selectedFile, (progress) => {
      setUploadProgress(progress);
    });

    if (result.success) {
      setUploadStatus("verifying");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setUploadStatus("success");
    } else {
      setUploadStatus("error");
      setErrorMessage(result.message);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadStatus("idle");
    setErrorMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-80 h-80 rounded-full bg-emerald-200/30 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 w-full max-w-xl flex items-center justify-between mb-6 md:mb-8 px-1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={onBack}
          className="glass-button rounded-xl p-2 md:p-2.5 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Upload Document</h2>
        <div className="w-8 md:w-10" />
      </motion.div>

      {/* Upload Area */}
      <motion.div
        className="relative z-10 w-full max-w-xl px-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <AnimatePresence mode="wait">
          {uploadStatus === "success" ? (
            <motion.div
              key="success"
              className="glass-card rounded-2xl md:rounded-3xl p-8 md:p-10 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15, delay: 0.2 }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 md:mb-5">
                  <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-emerald-500" />
                </div>
              </motion.div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                Upload Complete!
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mb-5 md:mb-6">
                Your file has been verified and uploaded successfully.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={reset}
                  className="py-2.5 md:py-3 px-5 md:px-6 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium text-xs md:text-sm transition-all duration-300 shadow-lg shadow-blue-500/25"
                >
                  Upload Another File
                </button>
              </motion.div>
            </motion.div>
          ) : uploadStatus === "verifying" ? (
            <motion.div
              key="verifying"
              className="glass-card rounded-2xl md:rounded-3xl p-8 md:p-10 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4 md:mb-5"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-blue-200 border-t-blue-500" />
              </motion.div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                Verifying Upload...
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                Please wait while we verify your file.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Drop Zone */}
              {!selectedFile && (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl md:rounded-2xl p-6 md:p-10 text-center cursor-pointer transition-all duration-300 ${
                    isDragging
                      ? "border-blue-400 bg-blue-50/50"
                      : "border-gray-300 hover:border-gray-400 bg-white/20"
                  }`}
                >
                  <motion.div
                    animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <CloudSync className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
                    </div>
                    <p className="text-xs md:text-sm font-medium text-gray-700 mb-1">
                      {isDragging ? "Drop your file here" : "Click or drag & drop"}
                    </p>
                    <p className="text-[10px] md:text-xs text-gray-500">
                      PDF files only, up to 50MB
                    </p>
                  </motion.div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </div>
              )}

              {/* Selected File */}
              <AnimatePresence>
                {selectedFile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white/30 mb-4 md:mb-5">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs md:text-sm font-medium text-gray-800 truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-500">
                          {formatFileSize(selectedFile.size)}
                        </p>
                      </div>
                      {uploadStatus !== "uploading" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            reset();
                          }}
                          className="p-1 md:p-1.5 rounded-lg hover:bg-white/50 transition-colors text-gray-500"
                        >
                          <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {uploadStatus === "uploading" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-4 md:mb-5"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] md:text-xs font-medium text-gray-600">
                            Uploading...
                          </span>
                          <span className="text-[10px] md:text-xs font-medium text-blue-500">
                            {uploadProgress}%
                          </span>
                        </div>
                        <div className="h-1.5 md:h-2 rounded-full bg-gray-200/50 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Error Message */}
                    {uploadStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-2.5 md:p-3 rounded-xl bg-red-50/50 border border-red-200/50 mb-4 md:mb-5"
                      >
                        <AlertCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500 shrink-0" />
                        <p className="text-[10px] md:text-xs text-red-600">{errorMessage}</p>
                      </motion.div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 md:gap-3">
                      <button
                        onClick={reset}
                        className="flex-1 py-2.5 md:py-3 px-3 md:px-4 rounded-xl glass-button text-gray-700 font-medium text-xs md:text-sm transition-all duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpload}
                        disabled={uploadStatus === "error"}
                        className="flex-1 py-2.5 md:py-3 px-3 md:px-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-1.5 md:gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
                      >
                        <CloudSync className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        Upload File
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Footer onDeveloperClick={onDeveloperClick} />
    </div>
  );
}
