import { MongoClient } from "mongodb";
import { env } from "src/config/env";

let client: MongoClient;

export async function connectToMongoDB() {
  try {
    if (env.NODE_ENV !== "production") {
      await import("./startAndSeedMemoryDB");
    }

    if (!client) {
      client = new MongoClient(env.DATABASE_URL);
      console.log("Connecting to MongoDB...");

      await client.connect();
      console.log("Successfully connected to MongoDB!");
    }
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

export function getMongoClient() {
  if (!client) {
    throw new Error(
      "MongoDB client not connected. Please call connectToMongoDB first."
    );
  }

  return client;
}
