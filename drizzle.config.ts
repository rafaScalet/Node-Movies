import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "@/env";

export default defineConfig({
  dialect: "sqlite",
  dbCredentials: {
    url: DATABASE_URL,
  },
  out: "./src/db/migrations",
  schema: "./src/db/schemas/**",
  casing: "snake_case",
  verbose: true,
  strict: true,
});
