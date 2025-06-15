import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { db } = await connectToDatabase();
    const taquerias = await db.collection("taquerias").find({}).toArray();
    res.status(200).json(taquerias);
  } catch (error) {
    console.error("Error fetching taquerias:", error);
    res.status(500).json({ error: "Error fetching taquerias" });
  }
}
