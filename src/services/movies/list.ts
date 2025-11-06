import { db } from "@/db/connections";
import { FastifyReply, FastifyRequest } from "fastify";

export async function list(_req: FastifyRequest, res: FastifyReply) {
  const moviesList = await db.query.movies.findMany();

  res.code(200).send({
    value: moviesList,
    message: "Movies retrieved successfully!",
    statusCode: 200,
  });
}