import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int().primaryKey(),
  name: text().notNull(),
  email: text().notNull(),
  password: text().notNull(),
  roles: text({ enum: ["admin", "normal"] }).notNull(),
});
