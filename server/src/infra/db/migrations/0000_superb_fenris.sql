CREATE TABLE "short_urls" (
	"id" serial PRIMARY KEY NOT NULL,
	"original_url" text NOT NULL,
	"short_code" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"clicks" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "short_urls_short_code_unique" UNIQUE("short_code")
);
--> statement-breakpoint
CREATE INDEX "short_code_idx" ON "short_urls" USING btree ("short_code");