import { z } from "zod";

export const UserSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
  role: z.enum(["admin", "user"]),
});

export const UserRequestSchema = UserSchema.omit({ id: true });

export const UserResponseSchema = UserSchema.omit({ password: true });

export type User = z.infer<typeof UserSchema>;

export type UserRequest = z.infer<typeof UserRequestSchema>;

export type UserResponse = z.infer<typeof UserResponseSchema>;

z.globalRegistry.add(UserSchema, {
  id: "User",
  title: "User Schema",
  description: "User Related Schema",
});

z.globalRegistry.add(UserRequestSchema, {
  id: "UserRequest",
  title: "User Request Schema",
  description: 'Schema to pass a User in the "body" field',
});

z.globalRegistry.add(UserResponseSchema, {
  id: "UserResponse",
  title: "User Response Schema",
  description: "Schema to use in the response field",
});
