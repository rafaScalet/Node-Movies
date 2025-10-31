import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const movies = sqliteTable("movies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull().unique(),
  description: text("description").notNull(),
  genres: text("genres", { mode: "json" }).notNull().$type<string[]>(),
  year: int("year").notNull(),
  duration: int("duration").notNull(),
  ageRating: text("age_rating").notNull(),
  posterLink: text("poster_link").notNull(),
  movieLink: text("movie_link").notNull()
});
