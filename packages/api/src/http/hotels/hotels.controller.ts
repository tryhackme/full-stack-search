import type { Context } from "src/types/common";
import { OK } from "../routes/_utils/statuses";
import { HotelService } from "./hotels.service";

export class HotelController {
  constructor(private readonly service: HotelService) {}

  async listHotels({ res, next }: Context) {
    try {
      const hotels = await this.service.listHotels();

      res.status(OK).json(hotels);
    } catch (error) {
      next(error);
    }
  }
}
