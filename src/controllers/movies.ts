import { FastifyTypedInstance } from "@/config";
import { MovieRequestSchema } from "@/schemas/movie";
import { OkResponseSchema } from "@/schemas/response";
import { create } from "@/services/movies/create";

export function MoviesController(app: FastifyTypedInstance) {
    app.post(
        "/addMovie",
        {
            schema: {
                body: MovieRequestSchema,
                tags: ["movies"],
                response: {
                    201: OkResponseSchema.describe("Created").omit({value: true})
                },
            },
        },
        create
    )
}