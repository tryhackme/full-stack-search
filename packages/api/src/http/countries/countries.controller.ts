import type { Context } from "src/types/common";
import { OK } from "../_utils/statuses";
import { CountryService } from "./countries.service";
import { NotFoundError } from "../_utils/http-errors";

export class CountryController {
  constructor(private readonly service: CountryService) {}

  async listCountries({ req, res, next }: Context) {
    try {
      const { country } = req.query;
      const countries = await this.service.listCountries(country?.toString());

      if (!countries.length) {
        throw new NotFoundError("no countries found.");
      }

      res.status(OK).json({ countries });
    } catch (error) {
      next(error);
    }
  }
}
