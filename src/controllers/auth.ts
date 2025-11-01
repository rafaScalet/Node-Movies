import { FastifyTypedInstance } from "@/config";
import { ErrorResponseSchema, OkResponseSchema } from "@/schemas/response";
import { UserRequestSchema } from "@/schemas/user";
import { signIn } from "@/services/auth/sign-in";
import { singUp } from "@/services/auth/sign-up";

export function AuthController(app: FastifyTypedInstance) {
  app.post(
    "/sign-in",
    {
      schema: {
        body: UserRequestSchema.omit({ name: true }),
        tags: ["auth"],
        response: {
          200: OkResponseSchema.describe("Authorized"),
          401: ErrorResponseSchema.describe("Unauthorized"),
          404: ErrorResponseSchema.describe("Not Found"),
        },
      },
    },
    signIn,
  );

  app.post(
    "/sign-up",
    {
      schema: {
        body: UserRequestSchema,
        tags: ["auth"],
        response: {
          201: OkResponseSchema.describe("Created"),
          409: ErrorResponseSchema.describe("Conflict"),
        },
      },
    },
    singUp,
  );
}
