import { connectDB } from "./lib/db";

const testConnection = async () => {
  try {
    const conn = await connectDB();
    console.log("✅ MongoDB connected:", conn?.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

testConnection()