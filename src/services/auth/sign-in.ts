import { db } from "@/db/connections";
import { UserRequest } from "@/schemas/user";
import { FastifyReply, FastifyRequest } from "fastify";
import argon2 from "argon2";

export async function signIn(req: FastifyRequest<{ Body: UserRequest }>, res: FastifyReply) {
  try {
    const { email, password, name, role } = req.body;

    const user = await db.query.users.findFirst({
      where: (data, { eq }) => eq(data.email, email),
    });

    if (!user) {
      return res.code(404).send({
        error: "Not Found",
        message: "User not found!",
        statusCode: 404,
      });
    }

    const passwordIsCorrect = await argon2.verify(user.password, password);

    if (!passwordIsCorrect) {
      return res.code(401).send({
        error: "Unauthorized",
        message: "Invalid user password!",
        statusCode: 401,
      });
    }

    const token = req.server.jwt.sign({ name: user.name, email: user.email, role: user.role });

    return res.code(200).send({
      value: { token },
      message: "Authorized",
      statusCode: 200,
    });
  } catch (error) {
    res.code(500).send(error);
  }
}
