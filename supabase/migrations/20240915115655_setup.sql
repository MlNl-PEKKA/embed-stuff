create table "public"."emote" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid,
    "type" text not null default 'emoji'::text,
    "url" text,
    "emoji" text not null default ''::text,
    "visibility" text not null default 'private'::text,
    "name" text not null default ''::text
);


create table "public"."kit" (
    "id" uuid not null default gen_random_uuid(),
    "created_by" uuid,
    "created_at" timestamp with time zone not null default now(),
    "name" text not null default ''::text,
    "visibility" text not null default 'private'::text
);


create table "public"."kit_emote" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "kit_id" uuid,
    "emote_id" uuid not null
);


create table "public"."project" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text default ''::text,
    "url" text not null,
    "status" text not null default 'inactive'::text,
    "user_id" uuid not null
);


create table "public"."project_kit" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "project_id" uuid not null,
    "kit_id" uuid not null
);


create table "public"."reaction" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid,
    "kit_emote_id" uuid not null
);


create table "public"."user" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "first_name" text not null,
    "last_name" text,
    "membership" text not null default 'free'::text
);


CREATE UNIQUE INDEX emote_pkey ON public.emote USING btree (id);

CREATE UNIQUE INDEX kit_emote_pkey ON public.kit_emote USING btree (id);

CREATE UNIQUE INDEX kit_pkey ON public.kit USING btree (id);

CREATE UNIQUE INDEX project_kit_pkey ON public.project_kit USING btree (id);

CREATE UNIQUE INDEX project_pkey ON public.project USING btree (id);

CREATE UNIQUE INDEX reaction_pkey ON public.reaction USING btree (id);

CREATE UNIQUE INDEX user_pkey ON public."user" USING btree (id);

alter table "public"."emote" add constraint "emote_pkey" PRIMARY KEY using index "emote_pkey";

alter table "public"."kit" add constraint "kit_pkey" PRIMARY KEY using index "kit_pkey";

alter table "public"."kit_emote" add constraint "kit_emote_pkey" PRIMARY KEY using index "kit_emote_pkey";

alter table "public"."project" add constraint "project_pkey" PRIMARY KEY using index "project_pkey";

alter table "public"."project_kit" add constraint "project_kit_pkey" PRIMARY KEY using index "project_kit_pkey";

alter table "public"."reaction" add constraint "reaction_pkey" PRIMARY KEY using index "reaction_pkey";

alter table "public"."user" add constraint "user_pkey" PRIMARY KEY using index "user_pkey";

alter table "public"."emote" add constraint "emote_created_by_fkey" FOREIGN KEY (created_by) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."emote" validate constraint "emote_created_by_fkey";

alter table "public"."emote" add constraint "emote_type_check" CHECK ((type = ANY (ARRAY['emoji'::text, 'sticker'::text]))) not valid;

alter table "public"."emote" validate constraint "emote_type_check";

alter table "public"."emote" add constraint "emote_visibility_check" CHECK ((visibility = ANY (ARRAY['private'::text, 'public'::text]))) not valid;

alter table "public"."emote" validate constraint "emote_visibility_check";

alter table "public"."kit" add constraint "kit_created_by_fkey" FOREIGN KEY (created_by) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."kit" validate constraint "kit_created_by_fkey";

alter table "public"."kit" add constraint "kit_visibility_check" CHECK ((visibility = ANY (ARRAY['private'::text, 'public'::text]))) not valid;

alter table "public"."kit" validate constraint "kit_visibility_check";

alter table "public"."kit_emote" add constraint "kit_emote_emote_id_fkey" FOREIGN KEY (emote_id) REFERENCES emote(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."kit_emote" validate constraint "kit_emote_emote_id_fkey";

alter table "public"."kit_emote" add constraint "kit_emote_kit_id_fkey" FOREIGN KEY (kit_id) REFERENCES kit(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."kit_emote" validate constraint "kit_emote_kit_id_fkey";

alter table "public"."project" add constraint "project_status_check" CHECK ((status = ANY (ARRAY['active'::text, 'inactive'::text]))) not valid;

alter table "public"."project" validate constraint "project_status_check";

alter table "public"."project" add constraint "project_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."project" validate constraint "project_user_id_fkey";

alter table "public"."project_kit" add constraint "project_kit_kit_id_fkey" FOREIGN KEY (kit_id) REFERENCES kit(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."project_kit" validate constraint "project_kit_kit_id_fkey";

alter table "public"."project_kit" add constraint "project_kit_project_id_fkey" FOREIGN KEY (project_id) REFERENCES project(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."project_kit" validate constraint "project_kit_project_id_fkey";

alter table "public"."reaction" add constraint "reaction_kit_emote_id_fkey" FOREIGN KEY (kit_emote_id) REFERENCES kit_emote(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."reaction" validate constraint "reaction_kit_emote_id_fkey";

alter table "public"."reaction" add constraint "reaction_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."reaction" validate constraint "reaction_user_id_fkey";

alter table "public"."user" add constraint "user_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user" validate constraint "user_id_fkey";

alter table "public"."user" add constraint "user_membership_check" CHECK ((membership = ANY (ARRAY['free'::text, 'pro'::text]))) not valid;

alter table "public"."user" validate constraint "user_membership_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.user (id, first_name, last_name)
  values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;
$function$
;

grant delete on table "public"."emote" to "anon";

grant insert on table "public"."emote" to "anon";

grant references on table "public"."emote" to "anon";

grant select on table "public"."emote" to "anon";

grant trigger on table "public"."emote" to "anon";

grant truncate on table "public"."emote" to "anon";

grant update on table "public"."emote" to "anon";

grant delete on table "public"."emote" to "authenticated";

grant insert on table "public"."emote" to "authenticated";

grant references on table "public"."emote" to "authenticated";

grant select on table "public"."emote" to "authenticated";

grant trigger on table "public"."emote" to "authenticated";

grant truncate on table "public"."emote" to "authenticated";

grant update on table "public"."emote" to "authenticated";

grant delete on table "public"."emote" to "service_role";

grant insert on table "public"."emote" to "service_role";

grant references on table "public"."emote" to "service_role";

grant select on table "public"."emote" to "service_role";

grant trigger on table "public"."emote" to "service_role";

grant truncate on table "public"."emote" to "service_role";

grant update on table "public"."emote" to "service_role";

grant delete on table "public"."kit" to "anon";

grant insert on table "public"."kit" to "anon";

grant references on table "public"."kit" to "anon";

grant select on table "public"."kit" to "anon";

grant trigger on table "public"."kit" to "anon";

grant truncate on table "public"."kit" to "anon";

grant update on table "public"."kit" to "anon";

grant delete on table "public"."kit" to "authenticated";

grant insert on table "public"."kit" to "authenticated";

grant references on table "public"."kit" to "authenticated";

grant select on table "public"."kit" to "authenticated";

grant trigger on table "public"."kit" to "authenticated";

grant truncate on table "public"."kit" to "authenticated";

grant update on table "public"."kit" to "authenticated";

grant delete on table "public"."kit" to "service_role";

grant insert on table "public"."kit" to "service_role";

grant references on table "public"."kit" to "service_role";

grant select on table "public"."kit" to "service_role";

grant trigger on table "public"."kit" to "service_role";

grant truncate on table "public"."kit" to "service_role";

grant update on table "public"."kit" to "service_role";

grant delete on table "public"."kit_emote" to "anon";

grant insert on table "public"."kit_emote" to "anon";

grant references on table "public"."kit_emote" to "anon";

grant select on table "public"."kit_emote" to "anon";

grant trigger on table "public"."kit_emote" to "anon";

grant truncate on table "public"."kit_emote" to "anon";

grant update on table "public"."kit_emote" to "anon";

grant delete on table "public"."kit_emote" to "authenticated";

grant insert on table "public"."kit_emote" to "authenticated";

grant references on table "public"."kit_emote" to "authenticated";

grant select on table "public"."kit_emote" to "authenticated";

grant trigger on table "public"."kit_emote" to "authenticated";

grant truncate on table "public"."kit_emote" to "authenticated";

grant update on table "public"."kit_emote" to "authenticated";

grant delete on table "public"."kit_emote" to "service_role";

grant insert on table "public"."kit_emote" to "service_role";

grant references on table "public"."kit_emote" to "service_role";

grant select on table "public"."kit_emote" to "service_role";

grant trigger on table "public"."kit_emote" to "service_role";

grant truncate on table "public"."kit_emote" to "service_role";

grant update on table "public"."kit_emote" to "service_role";

grant delete on table "public"."project" to "anon";

grant insert on table "public"."project" to "anon";

grant references on table "public"."project" to "anon";

grant select on table "public"."project" to "anon";

grant trigger on table "public"."project" to "anon";

grant truncate on table "public"."project" to "anon";

grant update on table "public"."project" to "anon";

grant delete on table "public"."project" to "authenticated";

grant insert on table "public"."project" to "authenticated";

grant references on table "public"."project" to "authenticated";

grant select on table "public"."project" to "authenticated";

grant trigger on table "public"."project" to "authenticated";

grant truncate on table "public"."project" to "authenticated";

grant update on table "public"."project" to "authenticated";

grant delete on table "public"."project" to "service_role";

grant insert on table "public"."project" to "service_role";

grant references on table "public"."project" to "service_role";

grant select on table "public"."project" to "service_role";

grant trigger on table "public"."project" to "service_role";

grant truncate on table "public"."project" to "service_role";

grant update on table "public"."project" to "service_role";

grant delete on table "public"."project_kit" to "anon";

grant insert on table "public"."project_kit" to "anon";

grant references on table "public"."project_kit" to "anon";

grant select on table "public"."project_kit" to "anon";

grant trigger on table "public"."project_kit" to "anon";

grant truncate on table "public"."project_kit" to "anon";

grant update on table "public"."project_kit" to "anon";

grant delete on table "public"."project_kit" to "authenticated";

grant insert on table "public"."project_kit" to "authenticated";

grant references on table "public"."project_kit" to "authenticated";

grant select on table "public"."project_kit" to "authenticated";

grant trigger on table "public"."project_kit" to "authenticated";

grant truncate on table "public"."project_kit" to "authenticated";

grant update on table "public"."project_kit" to "authenticated";

grant delete on table "public"."project_kit" to "service_role";

grant insert on table "public"."project_kit" to "service_role";

grant references on table "public"."project_kit" to "service_role";

grant select on table "public"."project_kit" to "service_role";

grant trigger on table "public"."project_kit" to "service_role";

grant truncate on table "public"."project_kit" to "service_role";

grant update on table "public"."project_kit" to "service_role";

grant delete on table "public"."reaction" to "anon";

grant insert on table "public"."reaction" to "anon";

grant references on table "public"."reaction" to "anon";

grant select on table "public"."reaction" to "anon";

grant trigger on table "public"."reaction" to "anon";

grant truncate on table "public"."reaction" to "anon";

grant update on table "public"."reaction" to "anon";

grant delete on table "public"."reaction" to "authenticated";

grant insert on table "public"."reaction" to "authenticated";

grant references on table "public"."reaction" to "authenticated";

grant select on table "public"."reaction" to "authenticated";

grant trigger on table "public"."reaction" to "authenticated";

grant truncate on table "public"."reaction" to "authenticated";

grant update on table "public"."reaction" to "authenticated";

grant delete on table "public"."reaction" to "service_role";

grant insert on table "public"."reaction" to "service_role";

grant references on table "public"."reaction" to "service_role";

grant select on table "public"."reaction" to "service_role";

grant trigger on table "public"."reaction" to "service_role";

grant truncate on table "public"."reaction" to "service_role";

grant update on table "public"."reaction" to "service_role";

grant delete on table "public"."user" to "anon";

grant insert on table "public"."user" to "anon";

grant references on table "public"."user" to "anon";

grant select on table "public"."user" to "anon";

grant trigger on table "public"."user" to "anon";

grant truncate on table "public"."user" to "anon";

grant update on table "public"."user" to "anon";

grant delete on table "public"."user" to "authenticated";

grant insert on table "public"."user" to "authenticated";

grant references on table "public"."user" to "authenticated";

grant select on table "public"."user" to "authenticated";

grant trigger on table "public"."user" to "authenticated";

grant truncate on table "public"."user" to "authenticated";

grant update on table "public"."user" to "authenticated";

grant delete on table "public"."user" to "service_role";

grant insert on table "public"."user" to "service_role";

grant references on table "public"."user" to "service_role";

grant select on table "public"."user" to "service_role";

grant trigger on table "public"."user" to "service_role";

grant truncate on table "public"."user" to "service_role";

grant update on table "public"."user" to "service_role";


