import { UserRequest } from "@/schemas/user";
import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "@/db/connections";
import { schema } from "@/db/schemas";

export async function singUp(
  req: FastifyRequest<{ Body: UserRequest }>,
  res: FastifyReply,
) {
  try {
    const newUser = req.body;

    const userAlreadyExits = await db.query.users.findFirst({
      where: (data, { eq }) => eq(data.email, newUser.email),
    });

    if (userAlreadyExits) {
      return res.code(409).send({
        error: "Conflict",
        message: "User with this email already exists!",
        statusCode: 409,
      });
    }

    const createdUser = await db.insert(schema.users).values(newUser);

    return res.code(201).send({
      value: { createdUser },
      message: "User created successfully",
      statusCode: 201,
    });
  } catch (error) {
    res.code(505).send(error);
  }
}
