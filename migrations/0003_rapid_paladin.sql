CREATE TABLE `venues` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`address` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`country` text NOT NULL,
	`postal_code` text NOT NULL,
	`latitude` integer NOT NULL,
	`longitude` integer NOT NULL,
	`svg_map` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE `events` ALTER COLUMN "venue_id" TO "venue_id" text NOT NULL REFERENCES venues(id) ON DELETE no action ON UPDATE no action;