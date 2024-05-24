import { cleanEnv, str, email, json } from "envalid";
require("dotenv").config();

const env = cleanEnv(process.env, {
  PASSKEY: str({ default: "DEFPASSKEY" }), // applying default for now as temporal solution
});

export default env;
