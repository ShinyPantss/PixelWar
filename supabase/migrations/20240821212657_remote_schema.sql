
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."events" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "event_name" "text",
    "participants" "uuid"[]
);

ALTER TABLE "public"."events" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."participants" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "applied_event_name" "text",
    "applied_image_url" "text",
    "participants_username" "text",
    "participants_userId" "uuid"
);

ALTER TABLE "public"."participants" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "username" "text",
    "full_name" "text",
    "email" "text",
    "avatar_url" "text",
    "free_image" boolean DEFAULT false,
    "generated_image_number" numeric DEFAULT '0'::numeric,
    "premium" boolean DEFAULT false,
    "followers" numeric DEFAULT '0'::numeric
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "Events_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_event_name_key" UNIQUE ("event_name");

ALTER TABLE ONLY "public"."participants"
    ADD CONSTRAINT "participants_participants_userId_key" UNIQUE ("participants_userId");

ALTER TABLE ONLY "public"."participants"
    ADD CONSTRAINT "participants_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_email_key" UNIQUE ("email");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");

ALTER TABLE ONLY "public"."participants"
    ADD CONSTRAINT "participants_applied_event_name_fkey" FOREIGN KEY ("applied_event_name") REFERENCES "public"."events"("event_name") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."participants"
    ADD CONSTRAINT "participants_participants_userId_fkey" FOREIGN KEY ("participants_userId") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."participants"
    ADD CONSTRAINT "participants_participants_username_fkey" FOREIGN KEY ("participants_username") REFERENCES "public"."profiles"("username");

ALTER TABLE "public"."events" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."participants" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."events" TO "anon";
GRANT ALL ON TABLE "public"."events" TO "authenticated";
GRANT ALL ON TABLE "public"."events" TO "service_role";

GRANT ALL ON TABLE "public"."participants" TO "anon";
GRANT ALL ON TABLE "public"."participants" TO "authenticated";
GRANT ALL ON TABLE "public"."participants" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
