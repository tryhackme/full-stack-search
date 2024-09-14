import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { MongoClient, ObjectId } from "mongodb";

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

app.get("/hotels/search", async (req, res) => {
  try {
    const searchQuery = req.query.q?.toString().toLowerCase() || "";

    const db = await connectToDatabase();
    const citiesCollection = db.collection("cities");
    const hotelsCollection = db.collection("hotels");
    const countriesCollection = db.collection("countries");

    const searchRegex = new RegExp(searchQuery, "i");

    const hotels = await hotelsCollection
      .find({
        $or: [
          { chain_name: { $regex: searchRegex } },
          { hotel_name: { $regex: searchRegex } },
          { city: { $regex: searchRegex } },
          { country: { $regex: searchRegex } },
        ],
      })
      .toArray();

    const countries = await countriesCollection
      .find({
        $or: [
          { country: { $regex: searchRegex } },
          { countryisocode: { $regex: searchRegex } },
        ],
      })
      .toArray();

    const cities = await citiesCollection
      .find({ name: { $regex: searchRegex } })
      .toArray();

    const uniqueHotels = hotels.filter(
      (hotel, index, self) =>
        index === self.findIndex((t) => t._id === hotel._id)
    );

    const uniqueCountries = countries.filter(
      (country, index, self) =>
        index === self.findIndex((c) => c._id === country._id)
    );

    const uniqueCities = cities.filter(
      (city, index, self) => index === self.findIndex((c) => c._id === city._id)
    );

    res.status(200).send({
      cities: uniqueCities,
      hotels: uniqueHotels,
      countries: uniqueCountries,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/hotels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectToDatabase();
    const hotel = await db
      .collection("hotels")
      .findOne({ _id: new ObjectId(id) });
    if (!hotel) {
      return res.status(404).send({ error: "Hotel not found" });
    }
    console.log({ hotel });
    res.status(200).send(hotel);
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/cities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectToDatabase();
    const city = await db
      .collection("cities")
      .findOne({ _id: new ObjectId(id) });
    if (!city) {
      return res.status(404).send({ error: "City not found" });
    }
    res.status(200).send(city);
  } catch (error) {
    console.error("Error fetching city details:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/countries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectToDatabase();
    const country = await db
      .collection("countries")
      .findOne({ _id: new ObjectId(id) });
    if (!country) {
      return res.status(404).send({ error: "Country not found" });
    }
    res.status(200).send(country);
  } catch (error) {
    console.error("Error fetching country details:", error);
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
