import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { buildRegexQuery, queryCollection } from "index.helpers";

dotenv.config();

if (process.env.NODE_ENV !== "production" && !process.env.DATABASE_URL) {
  await import("./db/startAndSeedMemoryDB");
}

const PORT = process.env.PORT || 3001;
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/hotels", async (req, res) => {
  const searchTerm = req.query.q ? req.query.q.toString() : "";
  let query = {};
  if (searchTerm) {
    query = {
      $or: [
        buildRegexQuery("hotel_name", searchTerm),
        buildRegexQuery("country", searchTerm),
      ],
    };
  }

  try {
    const hotels = await queryCollection("hotels", query);
    res.send(hotels);
  } catch (error) {
    res.status(500).send({
      error: error,
      message: "Error Fetching hotels",
    });
  }
});

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});
