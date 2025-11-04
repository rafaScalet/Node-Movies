import { seed, reset } from "drizzle-seed";
import { schema } from "@/db/schemas";
import { conn } from "@/db/connections";
import argon2 from "argon2";

const hash = await argon2.hash("12345678");

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
  }),
);

for (const [_tableName, tableData] of Object.entries(schema)) {
  console.log(await conn.select().from(tableData));
}
