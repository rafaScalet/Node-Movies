import { DATABASE_URL } from "@/env";
import { drizzle } from "drizzle-orm/libsql";
import { schema } from "@/db/schemas";
import { createClient } from "@libsql/client";

const client = createClient({ url: DATABASE_URL });

export const conn = drizzle(DATABASE_URL);

export const db = drizzle({ schema, client });
