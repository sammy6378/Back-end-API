CREATE TABLE IF NOT EXISTS "Address" (
	"id" serial PRIMARY KEY NOT NULL,
	"street_address_1" varchar NOT NULL,
	"street_address_2" varchar,
	"zip_code" varchar NOT NULL,
	"delivery_instructions" varchar,
	"user_id" integer NOT NULL,
	"city_id" integer NOT NULL,
	"created_at" date,
	"updated_at" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "city" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"state_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"comment_text" varchar NOT NULL,
	"is_complaint" boolean,
	"is_praise" boolean,
	"created_at" date,
	"updated_at" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Driver" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_make" varchar NOT NULL,
	"car_model" varchar NOT NULL,
	"car_year" integer NOT NULL,
	"user_id" integer NOT NULL,
	"online" boolean,
	"delivering" boolean,
	"created_at" date,
	"updated_at" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menu_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"restaurant_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"description" varchar,
	"ingredients" varchar,
	"price" numeric,
	"active" boolean,
	"created_at" date,
	"updated_at" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "OrderMenuItem" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"menu_item_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"item_price" numeric NOT NULL,
	"price" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "OrderStatus" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"status_catalog_id" integer NOT NULL,
	"created_at" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"restraunt_id" integer NOT NULL,
	"estimated_delivery_time" date,
	"actual_delivery_time" date,
	"delivery_address" integer NOT NULL,
	"user_id" integer,
	"driver_id" integer,
	"price" numeric,
	"discount" numeric,
	"final_price" numeric,
	"comment" varchar,
	"create_at" date,
	"updated_at" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurant" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"street_address" varchar,
	"zip_code" varchar,
	"city_id" integer,
	"created_at" date,
	"updated_at" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restraunt_owner" (
	"id" serial PRIMARY KEY NOT NULL,
	"restraunt_id" integer NOT NULL,
	"owner_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "state" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"code" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "status_catalog" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"contact_phone" varchar NOT NULL,
	"phone_verified" boolean,
	"email" varchar NOT NULL,
	"email_verified" boolean,
	"confirmation_code" varchar NOT NULL,
	"password" varchar NOT NULL,
	"created_at" date,
	"updated_at" date
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Address" ADD CONSTRAINT "Address_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "city" ADD CONSTRAINT "city_state_id_state_id_fk" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comment" ADD CONSTRAINT "Comment_order_id_Orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."Orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Driver" ADD CONSTRAINT "Driver_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_restaurant_id_restaurant_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OrderMenuItem" ADD CONSTRAINT "OrderMenuItem_order_id_Orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."Orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OrderMenuItem" ADD CONSTRAINT "OrderMenuItem_menu_item_id_menu_item_id_fk" FOREIGN KEY ("menu_item_id") REFERENCES "public"."menu_item"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OrderStatus" ADD CONSTRAINT "OrderStatus_order_id_Orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."Orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OrderStatus" ADD CONSTRAINT "OrderStatus_status_catalog_id_status_catalog_id_fk" FOREIGN KEY ("status_catalog_id") REFERENCES "public"."status_catalog"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Orders" ADD CONSTRAINT "Orders_restraunt_id_restaurant_id_fk" FOREIGN KEY ("restraunt_id") REFERENCES "public"."restaurant"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restraunt_owner" ADD CONSTRAINT "restraunt_owner_restraunt_id_restaurant_id_fk" FOREIGN KEY ("restraunt_id") REFERENCES "public"."restaurant"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
