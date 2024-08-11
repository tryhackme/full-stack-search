import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { cities } from "./seeds/cities.js";
import { countries } from "./seeds/countries.js";
import { hotels } from "./seeds/hotels.js";
import { env } from "src/config/env.js";

const mongod = await MongoMemoryServer.create({
  instance: {
    port: env.DATABASE_PORT,
  },
});
console.log("MongoMemoryServer started on", mongod.getUri());

const client = new MongoClient(mongod.getUri());
try {
  await client.connect();
  const db = client.db();
  await db.collection("cities").insertMany(cities);
  await db.collection("countries").insertMany(countries);
  await db.collection("hotels").insertMany(hotels);
} catch (error) {
  console.error("Error seeding database:", error);
} finally {
  await client.close();
}

process.on("SIGTERM", async () => {
  await mongod.stop();
  process.exit(0);
});
