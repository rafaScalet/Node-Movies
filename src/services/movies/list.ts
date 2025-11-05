import { Movie } from "@/schemas/movie";

const movies: Array<Movie> = [
  {
    id: "1",
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    genres: ["Action", "Sci-Fi"],
    year: 1999,
    duration: 136,
    ageRating: "+18",
    posterLink: "link_poster.com",
    movieLink: "link_filme.com"
  },
]

export async function list() {
  return movies;
}