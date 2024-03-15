import { Server } from "http";
import app from "./app";
import config from "./config";
import { connectDB } from "./utils/connectDB.util";

// handle uncaughtExceptions
process.on("uncaughtException", () => {
  console.error("Uncaught Exception...😓. Process Terminated");
  process.exit(1);
});

let server: Server;

const runServer = async (): Promise<void> => {
  try {
    await connectDB();
    server = app.listen(config.port, () => {
      if (config.isDevelopment) {
        console.info(`✔ Server started at http://localhost:${config.port}`);
      }
    });
  } catch (err: any) {
    console.error(err.message);
  }

  // handle unHandledRejection
  process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION... 💥. Process Terminated");
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

runServer();

// handle signal termination
process.on("SIGTERM", () => {
  console.info("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.info("💥 Process terminated!");
    process.exit(1);
  });
});
