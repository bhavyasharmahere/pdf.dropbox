export interface UserRecord {
  name: string;
  surname: string;
  phoneNumber: string;
}

export interface PdfFile {
  id: string;
  fileName: string;
  date: string;
  size: string;
  author: string;
  pages: number;
  url: string;
}

// Mock spreadsheet database
export const mockDatabase: UserRecord[] = [
  { name: "John", surname: "Doe", phoneNumber: "+1 555-0101" },
  { name: "Jane", surname: "Smith", phoneNumber: "+1 555-0102" },
  { name: "Michael", surname: "Johnson", phoneNumber: "+1 555-0103" },
  { name: "Emily", surname: "Williams", phoneNumber: "+1 555-0104" },
  { name: "David", surname: "Brown", phoneNumber: "+1 555-0105" },
  { name: "Sarah", surname: "Davis", phoneNumber: "+1 555-0106" },
  { name: "James", surname: "Miller", phoneNumber: "+1 555-0107" },
  { name: "Jessica", surname: "Wilson", phoneNumber: "+1 555-0108" },
  { name: "Robert", surname: "Moore", phoneNumber: "+1 555-0109" },
  { name: "Lisa", surname: "Taylor", phoneNumber: "+1 555-0110" },
];

// Mock Google Drive PDF files
export const mockPdfFiles: PdfFile[] = [
  {
    id: "pdf-001",
    fileName: "Annual_Report_2024.pdf",
    date: "2024-12-15",
    size: "2.4 MB",
    author: "Finance Department",
    pages: 45,
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "pdf-002",
    fileName: "Project_Proposal_Q1.pdf",
    date: "2024-11-28",
    size: "1.8 MB",
    author: "Project Team",
    pages: 32,
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "pdf-003",
    fileName: "Employee_Handbook.pdf",
    date: "2024-10-10",
    size: "5.1 MB",
    author: "HR Department",
    pages: 78,
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "pdf-004",
    fileName: "Security_Guidelines.pdf",
    date: "2024-09-22",
    size: "3.2 MB",
    author: "IT Security",
    pages: 56,
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "pdf-005",
    fileName: "Marketing_Strategy_2025.pdf",
    date: "2024-12-01",
    size: "4.5 MB",
    author: "Marketing Team",
    pages: 62,
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "pdf-006",
    fileName: "Technical_Specs_v2.pdf",
    date: "2024-11-15",
    size: "1.9 MB",
    author: "Engineering Team",
    pages: 28,
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

// Mock API functions
export async function authenticateUser(
  name: string,
  surname: string,
  phoneNumber: string
): Promise<{ success: boolean; message: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const normalizedName = name.trim().toLowerCase();
  const normalizedSurname = surname.trim().toLowerCase();
  const normalizedPhone = phoneNumber.trim();

  const match = mockDatabase.find(
    (record) =>
      record.name.toLowerCase() === normalizedName &&
      record.surname.toLowerCase() === normalizedSurname &&
      record.phoneNumber === normalizedPhone
  );

  if (match) {
    return { success: true, message: "Access Granted" };
  }

  return { success: false, message: "Kindly Verify Your Details" };
}

export async function fetchPdfFiles(): Promise<PdfFile[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [...mockPdfFiles];
}

export async function uploadPdfFile(
  _file: File,
  onProgress: (progress: number) => void
): Promise<{ success: boolean; message: string }> {
  // Simulate upload with progress
  const totalSteps = 20;
  for (let i = 0; i <= totalSteps; i++) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    onProgress(Math.round((i / totalSteps) * 100));
  }

  return { success: true, message: "File uploaded successfully" };
}
