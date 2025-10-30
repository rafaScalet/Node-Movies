import { User, UserRequest } from "@/schemas/user"
import { FastifyReply, FastifyRequest } from "fastify"

const users: Array<User> = []

export async function signIn(
  req: FastifyRequest<{ Body: UserRequest }>,
  res: FastifyReply
) {
  const { name, email, password } = req.body
  const user = users.find((data) => data.email === email)

  if (!user) {
    return res.code(404).send({
      error: "Not Found",
      message: "User not found!",
      statusCode: 404,
    })
  }

  if (user.password !== password) {
    return res.code(401).send({
      error: "Unauthorized",
      message: "Invalid user password!",
      statusCode: 401,
    })
  }

  const token = req.server.jwt.sign({ name, email })

  return res.code(200).send({
    value: { token },
    message: "Authorized",
    statusCode: 200,
  })
}
