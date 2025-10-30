import { seed, reset } from "drizzle-seed";
import { schema } from "@/db/schemas";
import { conn } from "@/db/connections";

await reset(conn, schema);

await seed(conn, schema, { seed: Math.floor(Math.random() * 10) }).refine(
  (funcs) => ({
    users: {
      columns: {
        role: funcs.valuesFromArray({ values: ["admin", "normal"] }),
      },
    },
  }),
);
