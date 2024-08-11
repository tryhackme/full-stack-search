import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { connectToMongoDB, getMongoClient } from "./database/mongo";

const app = express();

app.use(cors());
app.use(express.json());

await connectToMongoDB();

app.get("/hotels", async (req, res) => {
  try {
    const db = getMongoClient().db();
    const collection = db.collection("hotels");
    res.send(await collection.find().toArray());
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});
