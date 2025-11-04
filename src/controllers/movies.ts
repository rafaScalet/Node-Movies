import { FastifyTypedInstance } from "@/config";
import { MovieRequestSchema } from "@/schemas/movie";
import { ErrorResponseSchema, OkResponseSchema } from "@/schemas/response";
import { create } from "@/services/movies/create";
import { list } from "@/services/movies/list";

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
}