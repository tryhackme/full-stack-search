import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { connectToCluster } from "./db/connect";

dotenv.config();
const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL || '';

const app = express();

app.use(cors())
app.use(express.json());

app.get('/hotels', async (req, res) => {
  const mongoClient = await connectToCluster(DATABASE_URL);
  try {
    const db = mongoClient.db('accommodation_search')
    const collection = db.collection('hotels');
    res.send(await collection.find().toArray())
  } finally {
    await mongoClient.close();
  }
})

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`)
})
