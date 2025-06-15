import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db("test"); // Solo 'test', no 'test.taquerias'
    return { db, client };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
