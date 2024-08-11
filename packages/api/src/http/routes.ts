import { Router } from "express";
import { setupHotelRoutes } from "./hotels/hotels.routes";

export async function setupRoutes() {
  const router = Router();

  router.use(await setupHotelRoutes());

  return router;
}
