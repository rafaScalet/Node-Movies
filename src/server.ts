import { fastify } from "fastify";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
  jsonSchemaTransformObject,
  ZodTypeProvider
} from "fastify-type-provider-zod";
import fastifyScalarUI from '@scalar/fastify-api-reference';

const dev = process.env.NODE_ENV !== "production";

const app = fastify({
  logger: dev ? { transport: { target: "pino-pretty" } } : true,
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(fastifyCors, { origin: "*" });

await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Node Movies",
      description: "The Backend for Node Movies application",
      version: "1.0.0",
    },
    tags: [],
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

await app.register(fastifyScalarUI, { routePrefix: '/docs' });

await app.ready();

if (dev) {
  const filePath = resolve("openapi.json");
  const spec = JSON.stringify(app.swagger(), null, 2);

  writeFile(filePath, spec, "utf-8").then(() => {
    app.log.info(`OpenAPI file saved on ${filePath}`);
  });
}

app.listen({ port: 3333, host: "0.0.0.0" }, (err) => {
  console.clear();

  if (err) {
    app.log.error(err);
  }
});
