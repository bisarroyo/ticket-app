ALTER TABLE `venues` ADD `event_id` integer NOT NULL REFERENCES events(id);--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `venue_id`;