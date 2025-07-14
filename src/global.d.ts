// global.d.ts
import type { Mongoose } from "mongoose";

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseConn | undefined;
}
