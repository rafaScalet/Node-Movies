import { db } from "@/db/connections";
import { sql } from "drizzle-orm";
import { movies } from "@/db/schemas/movies";
import { MovieRequest } from "@/schemas/movie";
import { FastifyReply, FastifyRequest } from "fastify";

export async function create(req: FastifyRequest<{ Body: MovieRequest }>, res: FastifyReply) {
  const { title, description, genres, year, duration, ageRating, posterLink, movieLink } = req.body;

  const existingMovie = await db.query.movies.findFirst({
    where: sql`LOWER(${movies.title}) = LOWER(${title})`
  });

  if (existingMovie) {
    return res.code(409).send({
      error: "Conflict",
      message: "A movie with this title already exists!",
      statusCode: 409,
    });
  }

  await db.insert(movies).values({
    title,
    description,
    genres,
    year,
    duration,
    ageRating,
    posterLink,
    movieLink
  }).returning();

  return res.code(201).send({
    message: "Movie created successfully!",
    statusCode: 201,
  });
}