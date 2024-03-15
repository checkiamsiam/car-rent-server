import mongoose from "mongoose";
import config from "../config";

const connectDB = async (): Promise<void> => {
  try {
    const dbUri = config.isDevelopment ? config.dbUri : config.dbUri;
    if (!dbUri) {
      console.error("Database URL Not Found");
      process.exit(1);
    }
    await mongoose.connect(dbUri);
    console.error("✔ Database Connected");
  } catch (err: any) {
    console.error("Database not Connected");
    process.exit(1);
  }
};

export { connectDB };
