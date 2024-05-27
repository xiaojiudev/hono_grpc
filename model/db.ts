import { Database, MongoClient, APP_DATABASE_URI, APP_DATABASE_NAME } from "../deps.ts";

let client: MongoClient | null = null;
let db: Database | null = null;

export const connectDB = async () => {
    if (client && db) {
        return { client, db };
    }

    client = new MongoClient();

    await client.connect(APP_DATABASE_URI);
    db = client.database(APP_DATABASE_NAME);
    console.log("Connected to MongoDB successfully");

    return { client, db };
}

export const getDB = () => {
    if (!db) {
        throw new Error("Database connection failed");
    }

    return db;
}