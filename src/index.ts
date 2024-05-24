// src/index.ts
import express from "express";
import { ensureConnection } from "./utils/db";
import bodyParser from "body-parser";
import * as RouteHandlers from "./handlers";
// import { bodyValid } from "./middlewares/isSignupValid";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.post("/signup", RouteHandlers.signupHandler);
app.post("/login", RouteHandlers.loginHandler);
app.post("/logout", RouteHandlers.logoutHandler);

ensureConnection()
  .then(async (db: any) => {})
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
