import { Router } from "express";
import { getMongoClient } from "src/database/mongo";
import { CityController } from "./cities.controller";
import { CityService } from "./cities.service";

export async function setupCitiesRoutes(): Promise<Router> {
  const mongoClient = getMongoClient();
  const cityService = new CityService(mongoClient);
  const cityController = new CityController(cityService);

  const citiesRoutes = Router();
  citiesRoutes.get("/cities", async (req, res, next) =>
    cityController.listCities({ req, res, next })
  );
  citiesRoutes.get("/cities/:id", async (req, res, next) =>
    cityController.getCity({ req, res, next })
  );

  return citiesRoutes;
}
