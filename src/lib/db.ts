import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const cached: MongooseConn = globalThis.mongoose ?? {
  conn: null,
  promise: null,
};

globalThis.mongoose = cached;

export const connect = async (): Promise<Mongoose> => {
  if (!MONGODB_URL) throw new Error("Please define MONGODB_URL in .env");
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: "mystore",
      bufferCommands: false,
      connectTimeoutMS: 30000,
    });
  }

  cached.conn = await cached.promise;

  // Old Clerk-era unique username index rejects multiple users with username: null.
  // Replace with a sparse unique index so missing usernames are allowed.
  try {
    const users = cached.conn.connection.collection("users");
    const indexes = await users.indexes();
    const usernameIndex = indexes.find((idx) => idx.name === "username_1");
    if (usernameIndex && !usernameIndex.sparse) {
      await users.dropIndex("username_1");
      await users.createIndex(
        { username: 1 },
        { unique: true, sparse: true, name: "username_1" }
      );
    }
  } catch (err) {
    console.error("Could not repair users.username index:", err);
  }

  return cached.conn;
};
