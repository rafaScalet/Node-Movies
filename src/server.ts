import env, {
  APP_PORT,
  APP_HOST,
  NODE_ENV,
  CORS_ORIGIN,
  JWT_SECRET,
} from "@/env";
import { fastify } from "fastify";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import jwt from "@fastify/jwt";
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
  jsonSchemaTransformObject,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifyScalarUI from "@scalar/fastify-api-reference";
import { AuthController } from "./controllers/auth";
import { MoviesController } from "./controllers/movies";
import { ensureAdminUser } from "@/db/ensure-admin";

const dev = NODE_ENV === "develop";

const app = fastify({
  logger: dev ? { transport: { target: "pino-pretty" } } : true,
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(fastifyCors, { 
  origin: CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

await app.register(jwt, { secret: JWT_SECRET });

await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Node Movies",
      description: "The Backend for Node Movies application",
      version: "1.0.0",
    },
    tags: [
      { name: "auth", description: "Authentication related end-points" },
      { name: "movies", description: "Movies related end-points" },
    ],
    servers: [
      {
        url: "http://localhost:3333",
        description: "Development Server",
      },
    ],
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
  },
  transform: jsonSchemaTransform,
  transformObject: jsonSchemaTransformObject,
});

await app.register(AuthController);

await app.register(MoviesController);

await app.register(fastifyScalarUI, { routePrefix: "/docs" });

await ensureAdminUser();

await app.ready();

if (dev) {
  const filePath = resolve("openapi.json");
  const spec = JSON.stringify(app.swagger(), null, 2);

  writeFile(filePath, spec, "utf-8").then(() => {
    app.log.info(`OpenAPI file saved on ${filePath}`);
  });
}

const port = APP_PORT;
const host = APP_HOST;

app.listen({ port, host }, (err) => {
  console.clear();

  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  if (dev) app.log.info({ env }, "HTTP Server Running");
});
