import { z } from "zod";

export const UserSchema = z.object({
  id: z.int().default(1),
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
});

export const UserRequestSchema = UserSchema.omit({ id: true });

export const UserResponseSchema = UserSchema.omit({ password: true });

z.globalRegistry.add(UserSchema, { id: "user" });
z.globalRegistry.add(UserRequestSchema, { id: "user-request" });
z.globalRegistry.add(UserResponseSchema, { id: "user-response" });
