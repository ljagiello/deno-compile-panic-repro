import { Database } from "jsr:@db/sqlite@0.13.0";
import snowflake from "npm:snowflake-sdk";

snowflake.configure({
  logLevel: "WARN",
  disableOCSPChecks: true,
});

void Database;
