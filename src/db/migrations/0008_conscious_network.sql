PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_movies` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`genres` text NOT NULL,
	`year` integer NOT NULL,
	`duration` integer NOT NULL,
	`age_rating` text NOT NULL,
	`poster_link` text NOT NULL,
	`movie_link` text NOT NULL,
	CONSTRAINT "age_rating_check" CHECK("__new_movies"."age_rating" IN ('L', '10', '12', '14', '16', '18'))
);
--> statement-breakpoint
INSERT INTO `__new_movies`("id", "title", "description", "genres", "year", "duration", "age_rating", "poster_link", "movie_link") SELECT "id", "title", "description", "genres", "year", "duration", "age_rating", "poster_link", "movie_link" FROM `movies`;--> statement-breakpoint
DROP TABLE `movies`;--> statement-breakpoint
ALTER TABLE `__new_movies` RENAME TO `movies`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `movies_title_unique` ON `movies` (`title`);