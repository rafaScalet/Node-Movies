import { FastifyTypedInstance } from "@/config";
import { ErrorResponseSchema, OkResponseSchema} from "@/schemas/response";
import { UserRequestSchema } from "@/schemas/user";
import { login } from "@/services/auth/login";

export function AuthController(app: FastifyTypedInstance) {
    app.post('/login', {
        schema: {
            body: UserRequestSchema.omit({ name: true }),
            tags: ['auth'],
            response: {
                200: OkResponseSchema.describe("Authorized"),
                401: ErrorResponseSchema.describe("Unauthorized"),
                404: ErrorResponseSchema.describe("Not Found")
            }
        },
    }, login)
} 