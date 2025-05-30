PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
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
	`user_id` text,
	`map` integer DEFAULT false NOT NULL,
	`display_map` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_events`("id", "created_at", "updated_at", "date", "name", "description", "status", "is_active", "starts_at", "ends_at", "url", "is_online", "capacity", "event_image", "aditionalInfo", "prices", "venue_id", "duration", "user_id", "map", "display_map") SELECT "id", "created_at", "updated_at", "date", "name", "description", "status", "is_active", "starts_at", "ends_at", "url", "is_online", "capacity", "event_image", "aditionalInfo", "prices", "venue_id", "duration", "user_id", "map", "display_map" FROM `events`;--> statement-breakpoint
DROP TABLE `events`;--> statement-breakpoint
ALTER TABLE `__new_events` RENAME TO `events`;--> statement-breakpoint
PRAGMA foreign_keys=ON;