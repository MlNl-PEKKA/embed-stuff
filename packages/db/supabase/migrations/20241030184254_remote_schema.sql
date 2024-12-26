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
CREATE TYPE "public"."emote_visibility" AS ENUM (
    'public',
    'private'
);
ALTER TYPE "public"."emote_visibility" OWNER TO "postgres";
CREATE TYPE "public"."project_status" AS ENUM (
    'active',
    'inactive'
);
ALTER TYPE "public"."project_status" OWNER TO "postgres";
CREATE TYPE "public"."user_membership" AS ENUM (
    'free',
    'pro'
);
ALTER TYPE "public"."user_membership" OWNER TO "postgres";
CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$begin
  insert into
    public.user (id, name, email, image)
  values
    (
      new.id,
      new.raw_user_meta_data ->> 'name',
      new.email::text,
      coalesce(
        new.raw_user_meta_data ->> 'avatar_url',
        coalesce(
          new.raw_user_meta_data ->> 'picture',
          null
        )
      )
    );
  return new;
end;$$;
ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";
SET default_tablespace = '';
SET default_table_access_method = "heap";
CREATE TABLE IF NOT EXISTS "public"."emote" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid",
    "emoji" "text" NOT NULL,
    "name" "text" NOT NULL,
    "is_pro" boolean DEFAULT false NOT NULL,
    "visibility" "public"."emote_visibility" DEFAULT 'public'::"public"."emote_visibility" NOT NULL
);
ALTER TABLE "public"."emote" OWNER TO "postgres";
CREATE TABLE IF NOT EXISTS "public"."project" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "url" "text" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "status" "public"."project_status" DEFAULT 'active'::"public"."project_status" NOT NULL
);
ALTER TABLE "public"."project" OWNER TO "postgres";
CREATE TABLE IF NOT EXISTS "public"."project_emote" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "emote_id" "uuid" NOT NULL,
    "project_id" "uuid" NOT NULL
);
ALTER TABLE "public"."project_emote" OWNER TO "postgres";
CREATE TABLE IF NOT EXISTS "public"."reaction" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid",
    "project_emote_id" "uuid" NOT NULL
);
ALTER TABLE "public"."reaction" OWNER TO "postgres";
CREATE TABLE IF NOT EXISTS "public"."user" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "image" "text",
    "membership" "public"."user_membership" DEFAULT 'free'::"public"."user_membership" NOT NULL
);
ALTER TABLE "public"."user" OWNER TO "postgres";
ALTER TABLE ONLY "public"."emote"
    ADD CONSTRAINT "emote_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."project_emote"
    ADD CONSTRAINT "project_emote_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."project"
    ADD CONSTRAINT "project_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."reaction"
    ADD CONSTRAINT "reaction_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_email_key" UNIQUE ("email");
ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
ALTER TABLE ONLY "public"."emote"
    ADD CONSTRAINT "emote_created_by_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY "public"."project_emote"
    ADD CONSTRAINT "project_emote_emote_id_fkey" FOREIGN KEY ("emote_id") REFERENCES "public"."emote"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY "public"."project_emote"
    ADD CONSTRAINT "project_emote_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY "public"."project"
    ADD CONSTRAINT "project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY "public"."reaction"
    ADD CONSTRAINT "reaction_project_emote_id_fkey" FOREIGN KEY ("project_emote_id") REFERENCES "public"."project_emote"("id") ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY "public"."reaction"
    ADD CONSTRAINT "reaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";
GRANT ALL ON TABLE "public"."emote" TO "anon";
GRANT ALL ON TABLE "public"."emote" TO "authenticated";
GRANT ALL ON TABLE "public"."emote" TO "service_role";
GRANT ALL ON TABLE "public"."project" TO "anon";
GRANT ALL ON TABLE "public"."project" TO "authenticated";
GRANT ALL ON TABLE "public"."project" TO "service_role";
GRANT ALL ON TABLE "public"."project_emote" TO "anon";
GRANT ALL ON TABLE "public"."project_emote" TO "authenticated";
GRANT ALL ON TABLE "public"."project_emote" TO "service_role";
GRANT ALL ON TABLE "public"."reaction" TO "anon";
GRANT ALL ON TABLE "public"."reaction" TO "authenticated";
GRANT ALL ON TABLE "public"."reaction" TO "service_role";
GRANT ALL ON TABLE "public"."user" TO "anon";
GRANT ALL ON TABLE "public"."user" TO "authenticated";
GRANT ALL ON TABLE "public"."user" TO "service_role";
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
