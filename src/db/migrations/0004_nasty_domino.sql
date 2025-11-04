PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`roles` text NOT NULL,
	CONSTRAINT "roles_check_one" CHECK("__new_users"."roles" IN ('admin', 'normal'))
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "name", "email", "password", "roles") SELECT "id", "name", "email", "password", "roles" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);