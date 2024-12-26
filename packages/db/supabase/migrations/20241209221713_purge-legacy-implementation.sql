create type "public"."project_type" as enum ('feedback', 'banner', 'poll', 'reaction');
revoke delete on table "public"."emote" from "anon";
revoke insert on table "public"."emote" from "anon";
revoke references on table "public"."emote" from "anon";
revoke select on table "public"."emote" from "anon";
revoke trigger on table "public"."emote" from "anon";
revoke truncate on table "public"."emote" from "anon";
revoke update on table "public"."emote" from "anon";
revoke delete on table "public"."emote" from "authenticated";
revoke insert on table "public"."emote" from "authenticated";
revoke references on table "public"."emote" from "authenticated";
revoke select on table "public"."emote" from "authenticated";
revoke trigger on table "public"."emote" from "authenticated";
revoke truncate on table "public"."emote" from "authenticated";
revoke update on table "public"."emote" from "authenticated";
revoke delete on table "public"."emote" from "service_role";
revoke insert on table "public"."emote" from "service_role";
revoke references on table "public"."emote" from "service_role";
revoke select on table "public"."emote" from "service_role";
revoke trigger on table "public"."emote" from "service_role";
revoke truncate on table "public"."emote" from "service_role";
revoke update on table "public"."emote" from "service_role";
revoke delete on table "public"."form" from "anon";
revoke insert on table "public"."form" from "anon";
revoke references on table "public"."form" from "anon";
revoke select on table "public"."form" from "anon";
revoke trigger on table "public"."form" from "anon";
revoke truncate on table "public"."form" from "anon";
revoke update on table "public"."form" from "anon";
revoke delete on table "public"."form" from "authenticated";
revoke insert on table "public"."form" from "authenticated";
revoke references on table "public"."form" from "authenticated";
revoke select on table "public"."form" from "authenticated";
revoke trigger on table "public"."form" from "authenticated";
revoke truncate on table "public"."form" from "authenticated";
revoke update on table "public"."form" from "authenticated";
revoke delete on table "public"."form" from "service_role";
revoke insert on table "public"."form" from "service_role";
revoke references on table "public"."form" from "service_role";
revoke select on table "public"."form" from "service_role";
revoke trigger on table "public"."form" from "service_role";
revoke truncate on table "public"."form" from "service_role";
revoke update on table "public"."form" from "service_role";
revoke delete on table "public"."form_emote" from "anon";
revoke insert on table "public"."form_emote" from "anon";
revoke references on table "public"."form_emote" from "anon";
revoke select on table "public"."form_emote" from "anon";
revoke trigger on table "public"."form_emote" from "anon";
revoke truncate on table "public"."form_emote" from "anon";
revoke update on table "public"."form_emote" from "anon";
revoke delete on table "public"."form_emote" from "authenticated";
revoke insert on table "public"."form_emote" from "authenticated";
revoke references on table "public"."form_emote" from "authenticated";
revoke select on table "public"."form_emote" from "authenticated";
revoke trigger on table "public"."form_emote" from "authenticated";
revoke truncate on table "public"."form_emote" from "authenticated";
revoke update on table "public"."form_emote" from "authenticated";
revoke delete on table "public"."form_emote" from "service_role";
revoke insert on table "public"."form_emote" from "service_role";
revoke references on table "public"."form_emote" from "service_role";
revoke select on table "public"."form_emote" from "service_role";
revoke trigger on table "public"."form_emote" from "service_role";
revoke truncate on table "public"."form_emote" from "service_role";
revoke update on table "public"."form_emote" from "service_role";
revoke delete on table "public"."reaction" from "anon";
revoke insert on table "public"."reaction" from "anon";
revoke references on table "public"."reaction" from "anon";
revoke select on table "public"."reaction" from "anon";
revoke trigger on table "public"."reaction" from "anon";
revoke truncate on table "public"."reaction" from "anon";
revoke update on table "public"."reaction" from "anon";
revoke delete on table "public"."reaction" from "authenticated";
revoke insert on table "public"."reaction" from "authenticated";
revoke references on table "public"."reaction" from "authenticated";
revoke select on table "public"."reaction" from "authenticated";
revoke trigger on table "public"."reaction" from "authenticated";
revoke truncate on table "public"."reaction" from "authenticated";
revoke update on table "public"."reaction" from "authenticated";
revoke delete on table "public"."reaction" from "service_role";
revoke insert on table "public"."reaction" from "service_role";
revoke references on table "public"."reaction" from "service_role";
revoke select on table "public"."reaction" from "service_role";
revoke trigger on table "public"."reaction" from "service_role";
revoke truncate on table "public"."reaction" from "service_role";
revoke update on table "public"."reaction" from "service_role";
alter table "public"."emote" drop constraint "emote_created_by_fkey";
alter table "public"."form" drop constraint "form_user_id_fkey";
alter table "public"."form_emote" drop constraint "form_emote_emote_id_fkey";
alter table "public"."form_emote" drop constraint "form_emote_form_id_fkey";
alter table "public"."reaction" drop constraint "reaction_form_emote_id_fkey";
alter table "public"."reaction" drop constraint "reaction_user_id_fkey";
drop view if exists "public"."emote_option";
alter table "public"."emote" drop constraint "emote_pkey";
alter table "public"."form" drop constraint "form_pkey";
alter table "public"."form_emote" drop constraint "form_emote_pkey";
alter table "public"."reaction" drop constraint "reaction_pkey";
drop index if exists "public"."emote_pkey";
drop index if exists "public"."form_emote_pkey";
drop index if exists "public"."form_pkey";
drop index if exists "public"."reaction_pkey";
drop table "public"."emote";
drop table "public"."form";
drop table "public"."form_emote";
drop table "public"."reaction";
create table "public"."banner_project" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "title" text not null,
    "status" project_status not null default 'active'::project_status
);
create table "public"."feedback_project" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "title" text not null,
    "status" project_status not null default 'active'::project_status
);
create table "public"."poll_project" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "title" text not null,
    "status" project_status not null default 'active'::project_status
);
create table "public"."reaction_project" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "title" text not null,
    "status" project_status not null default 'active'::project_status
);
drop type "public"."emote_visibility";
drop type "public"."form_status";
CREATE UNIQUE INDEX banner_project_pkey ON public.banner_project USING btree (id);
CREATE UNIQUE INDEX feedback_project_pkey ON public.feedback_project USING btree (id);
CREATE UNIQUE INDEX project_pkey ON public.poll_project USING btree (id);
CREATE UNIQUE INDEX reaction_project_pkey ON public.reaction_project USING btree (id);
alter table "public"."banner_project" add constraint "banner_project_pkey" PRIMARY KEY using index "banner_project_pkey";
alter table "public"."feedback_project" add constraint "feedback_project_pkey" PRIMARY KEY using index "feedback_project_pkey";
alter table "public"."poll_project" add constraint "project_pkey" PRIMARY KEY using index "project_pkey";
alter table "public"."reaction_project" add constraint "reaction_project_pkey" PRIMARY KEY using index "reaction_project_pkey";
alter table "public"."banner_project" add constraint "banner_project_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;
alter table "public"."banner_project" validate constraint "banner_project_user_id_fkey";
alter table "public"."feedback_project" add constraint "feedback_project_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;
alter table "public"."feedback_project" validate constraint "feedback_project_user_id_fkey";
alter table "public"."poll_project" add constraint "poll_project_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;
alter table "public"."poll_project" validate constraint "poll_project_user_id_fkey";
alter table "public"."reaction_project" add constraint "reaction_project_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;
alter table "public"."reaction_project" validate constraint "reaction_project_user_id_fkey";
grant delete on table "public"."banner_project" to "anon";
grant insert on table "public"."banner_project" to "anon";
grant references on table "public"."banner_project" to "anon";
grant select on table "public"."banner_project" to "anon";
grant trigger on table "public"."banner_project" to "anon";
grant truncate on table "public"."banner_project" to "anon";
grant update on table "public"."banner_project" to "anon";
grant delete on table "public"."banner_project" to "authenticated";
grant insert on table "public"."banner_project" to "authenticated";
grant references on table "public"."banner_project" to "authenticated";
grant select on table "public"."banner_project" to "authenticated";
grant trigger on table "public"."banner_project" to "authenticated";
grant truncate on table "public"."banner_project" to "authenticated";
grant update on table "public"."banner_project" to "authenticated";
grant delete on table "public"."banner_project" to "service_role";
grant insert on table "public"."banner_project" to "service_role";
grant references on table "public"."banner_project" to "service_role";
grant select on table "public"."banner_project" to "service_role";
grant trigger on table "public"."banner_project" to "service_role";
grant truncate on table "public"."banner_project" to "service_role";
grant update on table "public"."banner_project" to "service_role";
grant delete on table "public"."feedback_project" to "anon";
grant insert on table "public"."feedback_project" to "anon";
grant references on table "public"."feedback_project" to "anon";
grant select on table "public"."feedback_project" to "anon";
grant trigger on table "public"."feedback_project" to "anon";
grant truncate on table "public"."feedback_project" to "anon";
grant update on table "public"."feedback_project" to "anon";
grant delete on table "public"."feedback_project" to "authenticated";
grant insert on table "public"."feedback_project" to "authenticated";
grant references on table "public"."feedback_project" to "authenticated";
grant select on table "public"."feedback_project" to "authenticated";
grant trigger on table "public"."feedback_project" to "authenticated";
grant truncate on table "public"."feedback_project" to "authenticated";
grant update on table "public"."feedback_project" to "authenticated";
grant delete on table "public"."feedback_project" to "service_role";
grant insert on table "public"."feedback_project" to "service_role";
grant references on table "public"."feedback_project" to "service_role";
grant select on table "public"."feedback_project" to "service_role";
grant trigger on table "public"."feedback_project" to "service_role";
grant truncate on table "public"."feedback_project" to "service_role";
grant update on table "public"."feedback_project" to "service_role";
grant delete on table "public"."poll_project" to "anon";
grant insert on table "public"."poll_project" to "anon";
grant references on table "public"."poll_project" to "anon";
grant select on table "public"."poll_project" to "anon";
grant trigger on table "public"."poll_project" to "anon";
grant truncate on table "public"."poll_project" to "anon";
grant update on table "public"."poll_project" to "anon";
grant delete on table "public"."poll_project" to "authenticated";
grant insert on table "public"."poll_project" to "authenticated";
grant references on table "public"."poll_project" to "authenticated";
grant select on table "public"."poll_project" to "authenticated";
grant trigger on table "public"."poll_project" to "authenticated";
grant truncate on table "public"."poll_project" to "authenticated";
grant update on table "public"."poll_project" to "authenticated";
grant delete on table "public"."poll_project" to "service_role";
grant insert on table "public"."poll_project" to "service_role";
grant references on table "public"."poll_project" to "service_role";
grant select on table "public"."poll_project" to "service_role";
grant trigger on table "public"."poll_project" to "service_role";
grant truncate on table "public"."poll_project" to "service_role";
grant update on table "public"."poll_project" to "service_role";
grant delete on table "public"."reaction_project" to "anon";
grant insert on table "public"."reaction_project" to "anon";
grant references on table "public"."reaction_project" to "anon";
grant select on table "public"."reaction_project" to "anon";
grant trigger on table "public"."reaction_project" to "anon";
grant truncate on table "public"."reaction_project" to "anon";
grant update on table "public"."reaction_project" to "anon";
grant delete on table "public"."reaction_project" to "authenticated";
grant insert on table "public"."reaction_project" to "authenticated";
grant references on table "public"."reaction_project" to "authenticated";
grant select on table "public"."reaction_project" to "authenticated";
grant trigger on table "public"."reaction_project" to "authenticated";
grant truncate on table "public"."reaction_project" to "authenticated";
grant update on table "public"."reaction_project" to "authenticated";
grant delete on table "public"."reaction_project" to "service_role";
grant insert on table "public"."reaction_project" to "service_role";
grant references on table "public"."reaction_project" to "service_role";
grant select on table "public"."reaction_project" to "service_role";
grant trigger on table "public"."reaction_project" to "service_role";
grant truncate on table "public"."reaction_project" to "service_role";
grant update on table "public"."reaction_project" to "service_role";
