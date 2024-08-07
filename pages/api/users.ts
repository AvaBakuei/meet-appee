import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const clinet = await clientPromise;
    const db = clinet.db("sample_mflix");

    switch (req.method) {
        case "GET":
            const users = await db.collection('users').find({}).toArray();
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
}