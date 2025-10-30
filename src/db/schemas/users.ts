import { sql } from "drizzle-orm";
import { check, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: int("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    role: text("roles", { enum: ["admin", "normal"] }).notNull(),
  },
  (table) => [
    check("roles_check_one", sql`${table.role} IN ('admin', 'normal')`),
  ],
);
