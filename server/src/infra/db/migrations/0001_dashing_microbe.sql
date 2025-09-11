CREATE TABLE "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_url" text NOT NULL,
	"object_key" varchar(512) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "reports_object_key_unique" UNIQUE("object_key")
);
--> statement-breakpoint
CREATE INDEX "reports_object_key_idx" ON "reports" USING btree ("object_key");