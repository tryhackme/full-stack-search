import { Router } from "express";
import { getMongoClient } from "src/database/mongo";
import { CountryController } from "./countries.controller";
import { CountryService } from "./countries.service";

export async function setupCountriesRoutes(): Promise<Router> {
  const mongoClient = getMongoClient();
  const countryService = new CountryService(mongoClient);
  const countryController = new CountryController(countryService);

  const countriesRoutes = Router();
  countriesRoutes.get("/countries", async (req, res, next) =>
    countryController.listCountries({ req, res, next })
  );
  countriesRoutes.get("/countries/:id", async (req, res, next) =>
    countryController.getCountry({ req, res, next })
  );

  return countriesRoutes;
}
