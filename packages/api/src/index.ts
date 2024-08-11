import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { connectToMongoDB } from "./database/mongo";
import { hotelRoutes } from "./http/routes/hotels.routes";

const app = express();

app.use(cors());
app.use(express.json());

await connectToMongoDB();

app.use(hotelRoutes);

const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});
