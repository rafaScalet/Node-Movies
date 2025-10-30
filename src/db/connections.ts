import { DATABASE_URL } from "@/env";
import { drizzle } from "drizzle-orm/libsql";

export const db = drizzle(DATABASE_URL);
