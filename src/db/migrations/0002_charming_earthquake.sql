CREATE TABLE `movies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`genres` text NOT NULL,
	`year` integer NOT NULL,
	`duration` integer NOT NULL,
	`age_rating` text NOT NULL,
	`poster_link` text NOT NULL,
	`movie_link` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `movies_title_unique` ON `movies` (`title`);