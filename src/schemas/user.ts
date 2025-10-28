import { z } from "zod";

export const UserSchema = z.object({
  id: z.int(),
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
});

export const UserRequestSchema = UserSchema.omit({ id: true });

export const UserResponseSchema = UserSchema.omit({ password: true });

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
