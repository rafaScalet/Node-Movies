import { sql } from "drizzle-orm";
import { check, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const movies = sqliteTable(
  "movies",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull().unique(),
    description: text("description").notNull(),
    genres: text("genres", { mode: "json" }).notNull().$type<string[]>(),
    year: int("year").notNull(),
    duration: int("duration").notNull(),
    ageRating: text("age_rating", { enum: ["L", "10", "12", "14", "16", "18"] }).notNull(),
    posterLink: text("poster_link").notNull(),
    movieLink: text("movie_link").notNull()
  },
  (table) => [
    check("age_rating_check", sql`${table.ageRating} IN ('L', '10', '12', '14', '16', '18')`),
  ],
);
