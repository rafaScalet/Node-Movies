import z from "zod";

export const ResponseSchema = z.object({
    statusCode: z.number().min(200).max(505),
    message: z.string(),
    error: z.string(),
    value: z.object({token: z.string().optional()})
})

export const OkResponseSchema = ResponseSchema.omit({error: true});

export const ErrorResponseSchema = ResponseSchema.omit({value: true});

export type AuthResponse = z.infer<typeof ResponseSchema>;

export type OkResponse = z.infer<typeof OkResponseSchema>;

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

z.globalRegistry.add(ResponseSchema, {
  id: "Response",
  title: "Response Schema",
  description: "Response Related Schema",
});


z.globalRegistry.add(OkResponseSchema, {
  id: "OkResponse",
  title: "Ok Response Schema",
  description: "Ok Related Schema",
});


z.globalRegistry.add(ErrorResponseSchema, {
  id: "ErrorResponse",
  title: "Error Response Schema",
  description: "Error Related Schema",
});
