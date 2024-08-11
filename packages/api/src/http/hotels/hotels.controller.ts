import type { Context } from "src/types/common";
import { OK } from "../_utils/statuses";
import { HotelService } from "./hotels.service";

export class HotelController {
  constructor(private readonly service: HotelService) {}

  async listHotels({ req, res, next }: Context) {
    try {
      const { search } = req.query;
      const hotels = await this.service.listHotels(search?.toString());

      res.status(OK).json(hotels);
    } catch (error) {
      next(error);
    }
  }
}
