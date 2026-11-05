// global.d.ts
import type { Mongoose } from "mongoose";

declare module "*.css" {
  const classNames: { readonly [key: string]: string };
  export default classNames;
}

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseConn | undefined;
}
