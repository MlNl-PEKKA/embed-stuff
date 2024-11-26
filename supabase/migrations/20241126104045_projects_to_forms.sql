create type "public"."form_status" as enum ('active', 'inactive');

revoke delete on table "public"."project" from "anon";

revoke insert on table "public"."project" from "anon";

revoke references on table "public"."project" from "anon";

revoke select on table "public"."project" from "anon";

revoke trigger on table "public"."project" from "anon";

revoke truncate on table "public"."project" from "anon";

revoke update on table "public"."project" from "anon";

revoke delete on table "public"."project" from "authenticated";

revoke insert on table "public"."project" from "authenticated";

revoke references on table "public"."project" from "authenticated";

revoke select on table "public"."project" from "authenticated";

revoke trigger on table "public"."project" from "authenticated";

revoke truncate on table "public"."project" from "authenticated";

revoke update on table "public"."project" from "authenticated";

revoke delete on table "public"."project" from "service_role";

revoke insert on table "public"."project" from "service_role";

revoke references on table "public"."project" from "service_role";

revoke select on table "public"."project" from "service_role";

revoke trigger on table "public"."project" from "service_role";

revoke truncate on table "public"."project" from "service_role";

revoke update on table "public"."project" from "service_role";

revoke delete on table "public"."project_emote" from "anon";

revoke insert on table "public"."project_emote" from "anon";

revoke references on table "public"."project_emote" from "anon";

revoke select on table "public"."project_emote" from "anon";

revoke trigger on table "public"."project_emote" from "anon";

revoke truncate on table "public"."project_emote" from "anon";

revoke update on table "public"."project_emote" from "anon";

revoke delete on table "public"."project_emote" from "authenticated";

revoke insert on table "public"."project_emote" from "authenticated";

revoke references on table "public"."project_emote" from "authenticated";

revoke select on table "public"."project_emote" from "authenticated";

revoke trigger on table "public"."project_emote" from "authenticated";

revoke truncate on table "public"."project_emote" from "authenticated";

revoke update on table "public"."project_emote" from "authenticated";

revoke delete on table "public"."project_emote" from "service_role";

revoke insert on table "public"."project_emote" from "service_role";

revoke references on table "public"."project_emote" from "service_role";

revoke select on table "public"."project_emote" from "service_role";

revoke trigger on table "public"."project_emote" from "service_role";

revoke truncate on table "public"."project_emote" from "service_role";

revoke update on table "public"."project_emote" from "service_role";

alter table "public"."project" drop constraint "project_user_id_fkey";

alter table "public"."project_emote" drop constraint "project_emote_emote_id_fkey";

alter table "public"."project_emote" drop constraint "project_emote_project_id_fkey";

alter table "public"."reaction" drop constraint "reaction_project_emote_id_fkey";

alter table "public"."project" drop constraint "project_pkey";

alter table "public"."project_emote" drop constraint "project_emote_pkey";

drop index if exists "public"."project_emote_pkey";

drop index if exists "public"."project_pkey";

drop table "public"."project";

drop table "public"."project_emote";

create table "public"."form" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "status" form_status not null default 'active'::form_status,
    "name" text not null
);


create table "public"."form_emote" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "form_id" uuid not null,
    "emote_id" uuid not null
);


alter table "public"."reaction" drop column "project_emote_id";

alter table "public"."reaction" add column "form_emote_id" uuid not null;

CREATE UNIQUE INDEX form_emote_pkey ON public.form_emote USING btree (id);

CREATE UNIQUE INDEX form_pkey ON public.form USING btree (id);

alter table "public"."form" add constraint "form_pkey" PRIMARY KEY using index "form_pkey";

alter table "public"."form_emote" add constraint "form_emote_pkey" PRIMARY KEY using index "form_emote_pkey";

alter table "public"."form" add constraint "form_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."form" validate constraint "form_user_id_fkey";

alter table "public"."form_emote" add constraint "form_emote_emote_id_fkey" FOREIGN KEY (emote_id) REFERENCES emote(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."form_emote" validate constraint "form_emote_emote_id_fkey";

alter table "public"."form_emote" add constraint "form_emote_form_id_fkey" FOREIGN KEY (form_id) REFERENCES form(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."form_emote" validate constraint "form_emote_form_id_fkey";

alter table "public"."reaction" add constraint "reaction_form_emote_id_fkey" FOREIGN KEY (form_emote_id) REFERENCES form_emote(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."reaction" validate constraint "reaction_form_emote_id_fkey";

grant delete on table "public"."form" to "anon";

grant insert on table "public"."form" to "anon";

grant references on table "public"."form" to "anon";

grant select on table "public"."form" to "anon";

grant trigger on table "public"."form" to "anon";

grant truncate on table "public"."form" to "anon";

grant update on table "public"."form" to "anon";

grant delete on table "public"."form" to "authenticated";

grant insert on table "public"."form" to "authenticated";

grant references on table "public"."form" to "authenticated";

grant select on table "public"."form" to "authenticated";

grant trigger on table "public"."form" to "authenticated";

grant truncate on table "public"."form" to "authenticated";

grant update on table "public"."form" to "authenticated";

grant delete on table "public"."form" to "service_role";

grant insert on table "public"."form" to "service_role";

grant references on table "public"."form" to "service_role";

grant select on table "public"."form" to "service_role";

grant trigger on table "public"."form" to "service_role";

grant truncate on table "public"."form" to "service_role";

grant update on table "public"."form" to "service_role";

grant delete on table "public"."form_emote" to "anon";

grant insert on table "public"."form_emote" to "anon";

grant references on table "public"."form_emote" to "anon";

grant select on table "public"."form_emote" to "anon";

grant trigger on table "public"."form_emote" to "anon";

grant truncate on table "public"."form_emote" to "anon";

grant update on table "public"."form_emote" to "anon";

grant delete on table "public"."form_emote" to "authenticated";

grant insert on table "public"."form_emote" to "authenticated";

grant references on table "public"."form_emote" to "authenticated";

grant select on table "public"."form_emote" to "authenticated";

grant trigger on table "public"."form_emote" to "authenticated";

grant truncate on table "public"."form_emote" to "authenticated";

grant update on table "public"."form_emote" to "authenticated";

grant delete on table "public"."form_emote" to "service_role";

grant insert on table "public"."form_emote" to "service_role";

grant references on table "public"."form_emote" to "service_role";

grant select on table "public"."form_emote" to "service_role";

grant trigger on table "public"."form_emote" to "service_role";

grant truncate on table "public"."form_emote" to "service_role";

grant update on table "public"."form_emote" to "service_role";


