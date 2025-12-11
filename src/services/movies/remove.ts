import { db } from "@/db/connections";
import { schema } from "@/db/schemas";
import { FastifyReply, FastifyRequest } from "fastify";
import { eq } from "drizzle-orm";

export async function remove(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
  try {
    const { id } = req.params;

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

    await db.delete(schema.movies).where(eq(schema.movies.id, id));

    return res.code(200).send({
      message: "Movie deleted successfully!",
      statusCode: 200,
    });
  } catch (error) {
    res.code(500).send(error);
  }
}