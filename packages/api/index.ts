import express from "express";
import cors from "cors";
import { buildRegexQuery, queryCollection, PORT } from "index.helpers";

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

app.get("/countries", async (req, res) => {
  const searchTerm = req.query.q ? req.query.q.toString() : "";
  let query = {};
  if (searchTerm) {
    query = buildRegexQuery("country", searchTerm);
  }

  try {
    const countries = await queryCollection("countries", query);
    res.send(countries);
  } catch (error) {
    res.status(500).send({
      error: error,
      message: "Error Fetching countries",
    });
  }
});

app.get("/cities", async (req, res) => {
  const searchTerm = req.query.q ? req.query.q.toString() : "";
  let query = {};
  if (searchTerm) {
    query = buildRegexQuery("name", searchTerm);
  }

  try {
    const countries = await queryCollection("cities", query);
    res.send(countries);
  } catch (error) {
    res.status(500).send({
      error: error,
      message: "Error Fetching cities",
    });
  }
});

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});
