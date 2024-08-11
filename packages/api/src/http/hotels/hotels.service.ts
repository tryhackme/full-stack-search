import type { Collection, MongoClient } from "mongodb";
import type { Hotel } from "schemas";

export class HotelService {
  private collection: Collection<Hotel>;

  constructor(
    private readonly dbClient: MongoClient,
    private readonly collectionName = "hotels"
  ) {
    this.collection = this.dbClient.db().collection<Hotel>(this.collectionName);
  }

  async listHotels(search?: string) {
    const query = search
      ? {
          $or: [
            { chainName: { $regex: search, $options: "i" } },
            { hotelName: { $regex: search, $options: "i" } },
            { city: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    return await this.collection.find(query).toArray();
  }
}
