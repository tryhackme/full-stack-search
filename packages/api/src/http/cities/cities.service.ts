import { ObjectId, type Collection, type MongoClient } from "mongodb";
import type { City } from "schemas";

export class CityService {
  private collection: Collection<City>;

  constructor(
    private readonly dbClient: MongoClient,
    private readonly collectionName = "cities"
  ) {
    this.collection = this.dbClient.db().collection<City>(this.collectionName);
  }

  async listCities(city?: string) {
    const query = city
      ? {
          name: { $regex: city, $options: "i" },
        }
      : {};

    return await this.collection.find(query).toArray();
  }

  async getCity(cityId: string) {
    return await this.collection.findOne({
      // @ts-ignore
      _id: new ObjectId(cityId),
    });
  }
}
