import { db } from "@/db/connections";
import { movies } from "@/db/schemas/movies";
import { FastifyReply, FastifyRequest } from "fastify";

export async function list(req: FastifyRequest, res: FastifyReply): Promise<void> {
  const moviesList = await db.select().from(movies);

  res.code(200).send({
    value: moviesList,
    message: "Movies retrieved successfully!",
    statusCode: 200,
  });
}