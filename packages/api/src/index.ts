import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { connectToMongoDB } from "./database/mongo";
import { errorHandler } from "./http/_utils/error-handler";
import { setupRoutes } from "./http/routes";

const app = express();

app.use(cors());
app.use(express.json());

(async () => {
  try {
    await connectToMongoDB();

    app.use(await setupRoutes());
    app.use(errorHandler);

    const PORT = env.PORT;
    app.listen(PORT, () => {
      console.log(`API Server Started at ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
})();
