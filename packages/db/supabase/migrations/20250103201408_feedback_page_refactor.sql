create type "public"."feedback_page_type" as enum ('blank', 'text', 'select', 'checkbox', 'level');

revoke delete on table "public"."feedback_question" from "anon";

revoke insert on table "public"."feedback_question" from "anon";

revoke references on table "public"."feedback_question" from "anon";

revoke select on table "public"."feedback_question" from "anon";

revoke trigger on table "public"."feedback_question" from "anon";

revoke truncate on table "public"."feedback_question" from "anon";

revoke update on table "public"."feedback_question" from "anon";

revoke delete on table "public"."feedback_question" from "authenticated";

revoke insert on table "public"."feedback_question" from "authenticated";

revoke references on table "public"."feedback_question" from "authenticated";

revoke select on table "public"."feedback_question" from "authenticated";

revoke trigger on table "public"."feedback_question" from "authenticated";

revoke truncate on table "public"."feedback_question" from "authenticated";

revoke update on table "public"."feedback_question" from "authenticated";

revoke delete on table "public"."feedback_question" from "service_role";

revoke insert on table "public"."feedback_question" from "service_role";

revoke references on table "public"."feedback_question" from "service_role";

revoke select on table "public"."feedback_question" from "service_role";

revoke trigger on table "public"."feedback_question" from "service_role";

revoke truncate on table "public"."feedback_question" from "service_role";

revoke update on table "public"."feedback_question" from "service_role";

alter table "public"."feedback_question" drop constraint "feedback_question_feedback_page_id_fkey";

alter table "public"."feedback_question" drop constraint "feedback_question_feedback_project_id_fkey";

alter table "public"."feedback_question" drop constraint "feedback_question_user_id_fkey";

alter table "public"."feedback_question" drop constraint "feedback_question_pkey";

drop index if exists "public"."feedback_question_pkey";

drop table "public"."feedback_question";

alter table "public"."feedback_page" drop column "order";

alter table "public"."feedback_page" add column "is_root" boolean not null default false;

alter table "public"."feedback_page" add column "next_id" uuid;

alter table "public"."feedback_page" alter column "feedback_project_id" drop default;

alter table "public"."feedback_page" alter column "meta" set not null;

alter table "public"."feedback_page" alter column "user_id" drop default;

drop type "public"."feedback_question_status";

drop type "public"."feedback_question_type";

alter table "public"."feedback_page" add constraint "feedback_page_next_id_fkey" FOREIGN KEY (next_id) REFERENCES feedback_page(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."feedback_page" validate constraint "feedback_page_next_id_fkey";


