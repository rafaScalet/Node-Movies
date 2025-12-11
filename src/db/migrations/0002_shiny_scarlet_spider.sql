CREATE TABLE `movies` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`genres` text NOT NULL,
	`year` integer NOT NULL,
	`duration` integer NOT NULL,
	`ageRating` text NOT NULL,
	`poster` text NOT NULL,
	`movie` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `movies_title_unique` ON `movies` (`title`);