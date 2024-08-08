import { MongoClient, Db } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

let client: MongoClient;
let db: Db;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db("sample_mflix");
  } catch (error) {
    throw new Error("Failed to stablish connection to database");
  }
}
(async () => {
  await init();
})();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!db) {
      throw new Error("Database not initialized");
    }

    switch (req.method) {
      case "GET":
        const users = await db.collection("users").find({}).toArray();
        res.status(200).json(users);
        break;
      case "POST":
        const newUser = await req.body;
        await db.collection("users").insertOne(newUser);
        res.status(200).json(newUser);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
