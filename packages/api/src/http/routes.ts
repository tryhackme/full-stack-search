import { Router } from "express";
import { setupHotelRoutes } from "./hotels/hotels.routes";
import { setupCountriesRoutes } from "./countries/countries.routes";
import { setupCitiesRoutes } from "./cities/cities.routes";

export async function setupRoutes() {
  const router = Router();

  router.use(await setupHotelRoutes());
  router.use(await setupCountriesRoutes());
  router.use(await setupCitiesRoutes());

  return router;
}
