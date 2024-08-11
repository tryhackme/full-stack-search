import type { Hotel } from "./hotels.type";
import type { Collection, MongoClient } from "mongodb";

export class HotelService {
  private collection: Collection<Hotel>;

  constructor(
    private readonly dbClient: MongoClient,
    private readonly collectionName = "hotels"
  ) {
    this.collection = this.dbClient.db().collection<Hotel>(this.collectionName);
  }

  async listHotels() {
    return await this.collection.find().toArray();
  }
}
