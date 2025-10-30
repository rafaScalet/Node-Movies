import { User, UserRequest } from "@/schemas/user"
import { FastifyReply, FastifyRequest } from "fastify"

const users: Array<User> = [
  {
    id: 1,
    name: "Murilo",
    email: "murilo@gmail.com",
    password: "murilo123",
    role: "user",
  },
  {
    id: 2,
    name: "Seiya",
    email: "seiya@gmail.com",
    password: "seiya123",
    role: "admin",
  },
]

export async function singUp(
  req: FastifyRequest<{ Body: UserRequest }>,
  res: FastifyReply
) {
  const { name, email, password, role } = req.body

  const userAlreadyExits = users.find((data) => data.email === email)

  if (  userAlreadyExits) {
    return res.code(409).send({
      error: "Conflict",
      message: "User with this email already exists!",
      statusCode: 409,
    })
  }

  const lastUserId = users.length > 0 ? users[users.length - 1].id : 0

  const newUser: User = {
    id: lastUserId + 1,
    name,
    email,
    password,
    role,
  }

  users.push(newUser)

  const UserResponse = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  }

  return res.code(201).send({
    value: { UserResponse },
    message: "User created successfully",
    statusCode: 201,
  })
}
