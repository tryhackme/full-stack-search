import { MongoClient } from "mongodb";

export const DATABASE_URL = process.env.DATABASE_URL as string;

/**
 * Helper function to query a collection.
 * @param {string} collectionName - The name of the collection.
 * @param {object} query - The MongoDB query object.
 * @returns {Promise<any[]>} - The results of the query.
 */
export const queryCollection = async (
  collectionName: string,
  query: object = {}
) => {
  const mongoClient = new MongoClient(DATABASE_URL);
  console.log("Connecting to MongoDB...");

  try {
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB!");
    const db = mongoClient.db();
    const collection = db.collection(collectionName);
    const queriedCollection = await collection.find(query).toArray();
    return queriedCollection;
  } catch (error) {
    console.error(error);
  } finally {
    await mongoClient.close();
  }
};

