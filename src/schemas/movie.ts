import { z } from "zod";

export const MovieSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1),
  description: z.string(),
  genres: z.array(z.string()),
  year: z.number().int().min(1895).max(9999),
  duration: z.number().int().min(1).max(26000),
  ageRating: z.string(),
  posterLink: z.url(),
  movieLink: z.url()
})

export const MovieRequestSchema = MovieSchema.omit({ id: true });

export const MovieResponseSchema = MovieSchema;

export type Movie = z.infer<typeof MovieSchema>;

export type MovieRequest = z.infer<typeof MovieRequestSchema>;

export type MovieResponse = z.infer<typeof MovieResponseSchema>;

z.globalRegistry.add(MovieSchema, {
  id: "Movie",
  title: "Movie Schema",
  description: "Movie Related Schema",
});

z.globalRegistry.add(MovieRequestSchema, {
  id: "MovieRequest",
  title: "Movie Request Schema",
  description: 'Schema to pass a Movie in the "body" field',
});

z.globalRegistry.add(MovieResponseSchema, {
  id: "MovieResponse",
  title: "Movie Response Schema",
  description: "Schema to use in the response field",
});