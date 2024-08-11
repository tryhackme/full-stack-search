import type { Collection, MongoClient } from "mongodb";
import type { Hotel } from "schemas";

export class CountryService {
  private collection: Collection<Hotel>;

  constructor(
    private readonly dbClient: MongoClient,
    private readonly collectionName = "countries"
  ) {
    this.collection = this.dbClient.db().collection<Hotel>(this.collectionName);
  }

  async listCountries(country?: string) {
    const query = country
      ? {
          country: { $regex: country, $options: "i" },
        }
      : {};

    return await this.collection.find(query).toArray();
  }
}
