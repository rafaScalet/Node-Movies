import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  APP_PORT: z.coerce.number().default(3333),
  APP_HOST: z.string().default("0.0.0.0"),
  CORS_ORIGIN: z.string().default("*"),
})

const _env = envSchema.parse(process.env)

export const { NODE_ENV, APP_PORT, APP_HOST, CORS_ORIGIN } = _env
