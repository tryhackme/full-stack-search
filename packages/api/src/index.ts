import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import { env } from "./config/env";

if (env.NODE_ENV !== "production") {
  await import("./db/startAndSeedMemoryDB");
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/hotels", async (req, res) => {
  const mongoClient = new MongoClient(env.DATABASE_URL);
  console.log("Connecting to MongoDB...");

  try {
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB!");
    const db = mongoClient.db();
    const collection = db.collection("hotels");
    res.send(await collection.find().toArray());
  } finally {
    await mongoClient.close();
  }
});

app.listen(env.PORT, () => {
  console.log(`API Server Started at ${env.PORT}`);
});
