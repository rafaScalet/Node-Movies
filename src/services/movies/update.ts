import { db } from "@/db/connections";
import { schema } from "@/db/schemas";
import { MovieRequest } from "@/schemas/movie";
import { FastifyReply, FastifyRequest } from "fastify";
import { eq } from "drizzle-orm";

export async function update(req: FastifyRequest<{ Params: { id: string }; Body: MovieRequest }>, res: FastifyReply) {
  try {
    const { id } = req.params;
    const { title, description, genres, year, duration, ageRating, posterLink, movieLink } = req.body;

    const existingMovie = await db.query.movies.findFirst({
      where: (data, { eq }) => eq(data.id, id),
    });

    if (!existingMovie) {
      return res.code(404).send({
        error: "Not Found",
        message: "Movie not found!",
        statusCode: 404,
      });
    }

    const movieAlreadyExists = await db.query.movies.findFirst({
      where: (data, { eq, and, ne }) => and(eq(data.title, title), ne(data.id, id)),
    });

    if (movieAlreadyExists) {
      return res.code(409).send({
        error: "Conflict",
        message: "A movie with this title already exists!",
        statusCode: 409,
      });
    }

    await db.update(schema.movies).set({
      title,
      description,
      genres,
      year,
      duration,
      ageRating,
      posterLink,
      movieLink
    }).where(eq(schema.movies.id, id));

    return res.code(200).send({
      message: "Movie updated successfully!",
      statusCode: 200,
    });
  } catch (error) {
    res.code(500).send(error);
  }
}