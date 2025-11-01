import { UserRequest } from "@/schemas/user";
import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "@/db/connections";
import { schema } from "@/db/schemas";
import { randomUUID } from "node:crypto";
import argon2 from "argon2";

export async function singUp(
  req: FastifyRequest<{ Body: UserRequest }>,
  res: FastifyReply,
) {
  try {
    const { email, password, name, role } = req.body;

    const id = randomUUID();

    const hash = await argon2.hash(password, { hashLength: 5 });

    const userAlreadyExits = await db.query.users.findFirst({
      where: (data, { eq }) => eq(data.email, email),
    });

    if (userAlreadyExits) {
      return res.code(409).send({
        error: "Conflict",
        message: "User with this email already exists!",
        statusCode: 409,
      });
    }

    const createdUser = await db
      .insert(schema.users)
      .values({ id, email, password: hash, name, role })
      .returning();

    const token = req.server.jwt.sign({ email, name, role });

    return res.code(201).send({
      value: { token, ...createdUser[0] },
      message: "User created successfully",
      statusCode: 201,
    });
  } catch (error) {
    res.code(505).send(error);
  }
}
