import dotenv from "dotenv";
import app from "./app";
import drive from "./services/drive";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const response = await drive.files.list({
      pageSize: 5,
      fields: "files(id, name)",
    });

    console.log("Google Drive Connected!");
    console.log(response.data.files);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Drive connection failed:", error);
  }
}

startServer();