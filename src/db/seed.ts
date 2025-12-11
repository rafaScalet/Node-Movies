import { randomUUID } from "node:crypto";
import argon2 from "argon2";
import { reset, seed } from "drizzle-seed";
import { conn } from "@/db/connections";
import { schema } from "@/db/schemas";

const hash = await argon2.hash("12345678");
const adminHash = await argon2.hash("Admin@123");

await reset(conn, schema);

await seed(conn, schema, { seed: Math.floor(Math.random() * 10) }).refine(
  (funcs) => ({
    users: {
      columns: {
        role: funcs.valuesFromArray({ values: ["admin", "user"] }),
        id: funcs.uuid(),
        password: funcs.default({ defaultValue: hash }),
      },
    },
    movies: {
      columns: {
        year: funcs.int({ minValue: 1990, maxValue: new Date().getFullYear() }),
        duration: funcs.int({ minValue: 30, maxValue: 26000 }),
        ageRating: funcs.valuesFromArray({
          values: ["L", "10", "12", "14", "16", "18"],
        }),
      },
    },
  }),
);

await conn.insert(schema.users).values({
  id: randomUUID(),
  email: "admin@email.com",
  name: "Admin",
  role: "admin",
  password: adminHash,
});

for (const [_tableName, tableData] of Object.entries(schema)) {
  console.log(await conn.select().from(tableData));
}
