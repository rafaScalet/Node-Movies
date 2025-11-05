import { db } from "@/db/connections";
import { schema } from "@/db/schemas";
import { MovieRequest } from "@/schemas/movie";
import { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";

export async function create(req: FastifyRequest<{ Body: MovieRequest }>, res: FastifyReply) {
  const { title, description, genres, year, duration, ageRating, posterLink, movieLink } = req.body;

  const movieAlreadyExits = await db.query.movies.findFirst({
    where: (data, { eq }) => eq(data.title, title),
  });

  if (movieAlreadyExits) {
    return res.code(409).send({
      error: "Conflict",
      message: "A movie with this title already exists!",
      statusCode: 409,
    });
  }

  const id = randomUUID();

  await db.insert(schema.movies).values({
    id,
    title,
    description,
    genres,
    year,
    duration,
    ageRating,
    posterLink,
    movieLink
  });

  return res.code(201).send({
    message: "Movie created successfully!",
    statusCode: 201,
  });
}