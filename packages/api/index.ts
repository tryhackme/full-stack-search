import express from "express";
import cors from "cors";
import { buildRegexQuery, queryCollection, PORT } from "index.helpers";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/hotels", async (req, res) => {
  const { search, country, city } = req.query;

  let query = {};

  if (search) {
    query = {
      $or: [
        buildRegexQuery("hotel_name", search.toString()),
        buildRegexQuery("country", search.toString()),
      ],
    };
  } else if (country) {
    query = buildRegexQuery("country", country.toString());
  } else if (city) {
    query = buildRegexQuery("city", city.toString());
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
  const { search } = req.query;
  let query = {};
  if (search) {
    query = buildRegexQuery("country", search.toString());
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
  const { search } = req.query;
  let query = {};
  if (search) {
    query = buildRegexQuery("name", search.toString());
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
