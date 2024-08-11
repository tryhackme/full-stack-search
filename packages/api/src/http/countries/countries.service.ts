import { ObjectId, type Collection, type MongoClient } from "mongodb";
import type { Country } from "schemas";

export class CountryService {
  private collection: Collection<Country>;

  constructor(
    private readonly dbClient: MongoClient,
    private readonly collectionName = "countries"
  ) {
    this.collection = this.dbClient
      .db()
      .collection<Country>(this.collectionName);
  }

  async listCountries(country?: string) {
    const query = country
      ? {
          country: { $regex: country, $options: "i" },
        }
      : {};

    return await this.collection.find(query).toArray();
  }

  async getCountry(countryId: string) {
    return await this.collection.findOne({
      // @ts-ignore
      _id: new ObjectId(countryId),
    });
  }
}
