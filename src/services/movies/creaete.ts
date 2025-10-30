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
    age: "+18",
    poster: "link_poster.com",
    link: "link_filme.com"
  },
  {
    id: 2,
    title: "Goonies",
    description: "A group of young misfits called The Goonies discover an ancient map and embark on a quest to find a legendary pirate's long-lost treasure.",
    genres: ["Adventure", "Comedy", "Fantasy"],
    year: 1985,
    duration: 114,
    age: "+12",
    poster: "link_poster.com",
    link: "link_filme.com"
  },
  {
    id: 3,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    genres: ["Adventure", "Fantasy"],
    year: 2001,
    duration: 178,
    age: "+12",
    poster: "link_poster.com",
    link: "link_filme.com"
  },
]

export async function postMovie(req: FastifyRequest<{ Body: MovieRequest }>, res: FastifyReply) {
  const { title, description, genres, year, duration, age, poster, link } = req.body;
  const id = movies.length + 1;

  const movie: Movie = { id, title, description, genres, year, duration, age, poster, link };

  movies.push(movie);

  return res.code(201).send({
    value: movie,
    message: "Movie created successfully!",
    statusCode: 201,
  });
}