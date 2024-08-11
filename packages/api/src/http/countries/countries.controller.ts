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

  async getCountry({ req, res, next }: Context) {
    try {
      const { id } = req.params;
      const country = await this.service.getCountry(id);

      if (!country) {
        throw new NotFoundError("country not found.");
      }

      res.status(OK).json({ country });
    } catch (error) {
      next(error);
    }
  }
}
