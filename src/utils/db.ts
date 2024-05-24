import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
const os = require("os");
const fs = require("fs");
const path = require("path");

mongoose.set("debug", true);
mongoose.Promise = Promise;

const dbPath = path.join(os.tmpdir(), "nedb");
fs.mkdirSync(dbPath, { recursive: true });

export const ensureConnection = async () => {
  const mongoServer = await MongoMemoryServer.create();
  return new Promise((resolve, reject) => {
    // This is needed
    mongoose.connect(mongoServer.getUri(), { dbName: "smartchain" });
    const db = mongoose.connection;
    db.on("error", (err: any) => {
      console.error.bind(console, "connection error:");
      reject(err);
    });
    db.once("open", async () => {
      console.log("connected", dbPath);
      resolve(db);
    });
  });
};
