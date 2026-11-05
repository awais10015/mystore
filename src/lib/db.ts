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
  return cached.conn;
};
