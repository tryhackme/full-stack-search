import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { connectToMongoDB } from "./database/mongo";
import { hotelRoutes } from "./http/routes/hotels.routes";
import { errorHandler } from "./http/error-handler";

const app = express();

app.use(cors());
app.use(express.json());

await connectToMongoDB();

app.use(hotelRoutes);

app.use(errorHandler);

const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});
