import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { MongoClient } from "mongodb";

dotenv.config();

if (process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL) {
  await import('./db/startAndSeedMemoryDB');
}

const PORT = process.env.PORT || 3001;
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();

app.use(cors())
app.use(express.json());

let mongoClient: MongoClient;

const connectToDatabase = async () => {
  if (!mongoClient) {
    mongoClient = new MongoClient(DATABASE_URL, {
      minPoolSize: 1,
      maxPoolSize: 2,
    });
    try {
      await mongoClient.connect();
      console.log("Successfully connected to MongoDB!");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      throw new Error("Could not connect to MongoDB");
    }
  }
  return mongoClient.db();
};

app.get('/hotels', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("hotels");
    const hotels = await collection.find().toArray();
    res.status(200).send(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
})

app.get("/search", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const citiesCollection = db.collection("cities");
    const hotelsCollection = db.collection("hotels");
    const countriesCollection = db.collection("countries");
    const cities = await citiesCollection.find().toArray();
    const hotels = await hotelsCollection.find().toArray();
    const countries = await countriesCollection.find().toArray();
    res.status(200).send({ cities, hotels, countries });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

process.on("uncaughtException", (err) => {
  console.error("Unhandled Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`)
})
