PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_venues` (
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
	`event_id` integer DEFAULT 1 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_venues`("id", "name", "address", "city", "state", "country", "postal_code", "latitude", "longitude", "svg_map", "event_id", "created_at", "updated_at") SELECT "id", "name", "address", "city", "state", "country", "postal_code", "latitude", "longitude", "svg_map", "event_id", "created_at", "updated_at" FROM `venues`;--> statement-breakpoint
DROP TABLE `venues`;--> statement-breakpoint
ALTER TABLE `__new_venues` RENAME TO `venues`;--> statement-breakpoint
PRAGMA foreign_keys=ON;