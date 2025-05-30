CREATE TABLE `events` (
	`eventId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`date` integer NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`status` text NOT NULL,
	`is_active` integer DEFAULT false NOT NULL,
	`starts_at` integer NOT NULL,
	`ends_at` integer NOT NULL,
	`url` text,
	`is_online` integer DEFAULT false NOT NULL,
	`capacity` integer DEFAULT 0 NOT NULL,
	`event_image` text NOT NULL,
	`aditionalInfo` text,
	`prices` text,
	`venue_id` text NOT NULL,
	`duration` integer,
	`image_url` text,
	`user_id` text,
	`map` integer DEFAULT false NOT NULL,
	`display_map` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
DROP TABLE `foo`;