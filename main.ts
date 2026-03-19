import { snowflake, adapter, generateText } from "@repro/agent";
import { value } from "@repro/agent/gen";
console.log("done:", typeof snowflake.createConnection, adapter.type, typeof generateText, value);
