import { FastifyTypedInstance } from "@/config";
import { MovieRequestSchema } from "@/schemas/movie";
import { ErrorResponseSchema, OkResponseSchema } from "@/schemas/response";
import { create } from "@/services/movies/create";
import { list } from "@/services/movies/list";
import { update } from "@/services/movies/update";
import { remove } from "@/services/movies/remove";
import { z } from "zod";

export function MoviesController(app: FastifyTypedInstance) {
  app.post(
    "/addMovie",
    {
      schema: {
        body: MovieRequestSchema,
        tags: ["movies"],
        response: {
          201: OkResponseSchema.describe("Created").omit({ value: true }),
          409: ErrorResponseSchema.describe("Conflict")
        },
      },
    },
    create,
  );

  app.get(
    "/movies",
    {
      schema: {
        tags: ["movies"],
        200: OkResponseSchema.describe("Ok")
      },
    },
    list,
  );

  app.put(
    "/movies/:id",
    {
      schema: {
        params: z.object({ id: z.uuid() }),
        body: MovieRequestSchema,
        tags: ["movies"],
        response: {
          200: OkResponseSchema.describe("Updated").omit({ value: true }),
          404: ErrorResponseSchema.describe("Not Found")
        },
      },
    },
    update,
  );

  app.delete(
    "/movies/:id",
    {
      schema: {
        params: z.object({ id: z.uuid() }),
        tags: ["movies"],
        response: {
          200: OkResponseSchema.describe("Deleted").omit({ value: true }),
          404: ErrorResponseSchema.describe("Not Found")
        },
      },
    },
    remove,
  );
}