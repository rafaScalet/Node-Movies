import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const movies = sqliteTable(
  "movies",
  {
    id: int("id").primaryKey(),
    title: text("title").notNull().unique(),
    description: text("description").notNull(),
    genres: text("genres", { mode: "json" }).notNull().$type<string[]>(),
    year: int("year").notNull(),
    duration: int("duration").notNull(),
    ageRating: text("ageRating").notNull(),
    poster: text("poster").notNull(),
    movie: text("movie").notNull()
  }
);
