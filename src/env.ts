import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
  HOST: z.string().default("0.0.0.0"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(1),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error("Invalid enviroment variables: ", _env.error.format())
  throw new Error("Invalid enviroment variables.")
}

export const env = _env.data
