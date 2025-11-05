import { Movie, MovieRequest } from "@/schemas/movie";
import { FastifyReply, FastifyRequest } from "fastify";

const movies: Array<Movie> = [
  {
    id: 1,
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

export async function create(req: FastifyRequest<{ Body: MovieRequest }>, res: FastifyReply) {
  const { title, description, genres, year, duration, ageRating, posterLink, movieLink } = req.body;
  const id = movies.length + 1;

  const movie: Movie = { id, title, description, genres, year, duration, ageRating, posterLink, movieLink };

  movies.push(movie);

  return res.code(201).send({
    message: "Movie created successfully!",
    statusCode: 201,
  });
}