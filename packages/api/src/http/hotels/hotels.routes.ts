import { Router } from "express";
import { getMongoClient } from "src/database/mongo";
import { HotelController } from "./hotels.controller";
import { HotelService } from "./hotels.service";

export async function setupHotelRoutes(): Promise<Router> {
  const mongoClient = getMongoClient();
  const hotelService = new HotelService(mongoClient);
  const hotelController = new HotelController(hotelService);

  const hotelRoutes = Router();
  hotelRoutes.get("/hotels", async (req, res, next) =>
    hotelController.listHotels({ req, res, next })
  );

  return hotelRoutes;
}
