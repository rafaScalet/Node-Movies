import { reset } from "drizzle-seed";
import { schema } from "@/db/schemas";
import { conn } from "@/db/connections";

await reset(conn, schema);

console.log("Database Dropped");
