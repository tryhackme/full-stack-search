import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { MongoClient } from "mongodb";

dotenv.config();
const PORT = process.env.PORT || 3001;
const DATABASE = process.env.DATABASE || '';
const DATABASE_URL = process.env.DATABASE_URL || '';

const app = express();

app.use(cors())
app.use(express.json());

app.get('/hotels', async (req, res) => {
  const mongoClient = new MongoClient(DATABASE_URL);
  console.log('Connecting to MongoDB Atlas cluster...');

  try {
    await mongoClient.connect();
    console.log('Successfully connected to MongoDB Atlas!');
    const db = mongoClient.db(DATABASE)
    const collection = db.collection('hotels');
    res.send(await collection.find().toArray())
  } finally {
    await mongoClient.close();
  }
})

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`)
})
