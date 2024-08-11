import { Router } from "express";
import { setupHotelRoutes } from "./hotels.routes";

export async function setupRoutes() {
  const router = Router();

  router.use(await setupHotelRoutes());

  return router;
}
