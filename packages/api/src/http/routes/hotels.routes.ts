import { Router } from "express";
import { getMongoClient } from "src/database/mongo";

export const hotelRoutes = Router();

hotelRoutes.get("/hotels", async (_, res) => {
  try {
    const db = getMongoClient().db();
    const collection = db.collection("hotels");
    res.send(await collection.find().toArray());
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
