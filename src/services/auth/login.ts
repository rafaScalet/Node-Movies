import { User, UserRequest } from "@/schemas/user";
import { FastifyReply, FastifyRequest } from "fastify";

const users: Array<User> = [
  {
    id: 1,
    name: "Angelo",
    email: "angelo@gmail.com",
    password: "banana123"
  },
  {
    id: 2,
    name: "Banana",
    email: "banana@gmail.com",
    password: "labubu123"
  }
];

export async function login(req: FastifyRequest<{ Body: UserRequest }>, res: FastifyReply) {
  const { name, email, password } = req.body;
  const user = users.find((data) => data.email === email);

  if (!user) {
    return res.code(404).send({
      error: "Not Found",
      message: "User not found!",
      statusCode: 404,
    });
  }

  if (user.password !== password) {
    return res.code(401).send({
      error: "Unauthorized",
      message: "Invalid user password!",
      statusCode: 401,
    });
  }

  const token = req.server.jwt.sign({ name, email })

  return res.code(200).send({
    token,
    error: "Ok",
    message: "Authorized",
    statusCode: 200,
  });
}