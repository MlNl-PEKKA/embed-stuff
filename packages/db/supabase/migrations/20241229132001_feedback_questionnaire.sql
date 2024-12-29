create type "public"."feedback_question_status" as enum ('archived', 'active');

create type "public"."feedback_question_type" as enum ('text', 'select', 'checkbox', 'level');

create table "public"."feedback_page" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null default gen_random_uuid(),
    "feedback_project_id" uuid not null default gen_random_uuid(),
    "order" numeric not null,
    "meta" jsonb
);


create table "public"."feedback_question" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null default gen_random_uuid(),
    "feedback_project_id" uuid not null default gen_random_uuid(),
    "feedback_page_id" uuid default gen_random_uuid(),
    "title" text not null,
    "description" text,
    "required" boolean not null default false,
    "type" feedback_question_type not null default 'text'::feedback_question_type,
    "order" numeric,
    "status" feedback_question_status not null default 'active'::feedback_question_status
);


CREATE UNIQUE INDEX feedback_page_pkey ON public.feedback_page USING btree (id);

CREATE UNIQUE INDEX feedback_question_pkey ON public.feedback_question USING btree (id);

alter table "public"."feedback_page" add constraint "feedback_page_pkey" PRIMARY KEY using index "feedback_page_pkey";

alter table "public"."feedback_question" add constraint "feedback_question_pkey" PRIMARY KEY using index "feedback_question_pkey";

alter table "public"."feedback_page" add constraint "feedback_page_feedback_project_id_fkey" FOREIGN KEY (feedback_project_id) REFERENCES feedback_project(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."feedback_page" validate constraint "feedback_page_feedback_project_id_fkey";

alter table "public"."feedback_page" add constraint "feedback_page_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."feedback_page" validate constraint "feedback_page_user_id_fkey";

alter table "public"."feedback_question" add constraint "feedback_question_feedback_page_id_fkey" FOREIGN KEY (feedback_page_id) REFERENCES feedback_page(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."feedback_question" validate constraint "feedback_question_feedback_page_id_fkey";

alter table "public"."feedback_question" add constraint "feedback_question_feedback_project_id_fkey" FOREIGN KEY (feedback_project_id) REFERENCES feedback_project(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."feedback_question" validate constraint "feedback_question_feedback_project_id_fkey";

alter table "public"."feedback_question" add constraint "feedback_question_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."feedback_question" validate constraint "feedback_question_user_id_fkey";

grant delete on table "public"."feedback_page" to "anon";

grant insert on table "public"."feedback_page" to "anon";

grant references on table "public"."feedback_page" to "anon";

grant select on table "public"."feedback_page" to "anon";

grant trigger on table "public"."feedback_page" to "anon";

grant truncate on table "public"."feedback_page" to "anon";

grant update on table "public"."feedback_page" to "anon";

grant delete on table "public"."feedback_page" to "authenticated";

grant insert on table "public"."feedback_page" to "authenticated";

grant references on table "public"."feedback_page" to "authenticated";

grant select on table "public"."feedback_page" to "authenticated";

grant trigger on table "public"."feedback_page" to "authenticated";

grant truncate on table "public"."feedback_page" to "authenticated";

grant update on table "public"."feedback_page" to "authenticated";

grant delete on table "public"."feedback_page" to "service_role";

grant insert on table "public"."feedback_page" to "service_role";

grant references on table "public"."feedback_page" to "service_role";

grant select on table "public"."feedback_page" to "service_role";

grant trigger on table "public"."feedback_page" to "service_role";

grant truncate on table "public"."feedback_page" to "service_role";

grant update on table "public"."feedback_page" to "service_role";

grant delete on table "public"."feedback_question" to "anon";

grant insert on table "public"."feedback_question" to "anon";

grant references on table "public"."feedback_question" to "anon";

grant select on table "public"."feedback_question" to "anon";

grant trigger on table "public"."feedback_question" to "anon";

grant truncate on table "public"."feedback_question" to "anon";

grant update on table "public"."feedback_question" to "anon";

grant delete on table "public"."feedback_question" to "authenticated";

grant insert on table "public"."feedback_question" to "authenticated";

grant references on table "public"."feedback_question" to "authenticated";

grant select on table "public"."feedback_question" to "authenticated";

grant trigger on table "public"."feedback_question" to "authenticated";

grant truncate on table "public"."feedback_question" to "authenticated";

grant update on table "public"."feedback_question" to "authenticated";

grant delete on table "public"."feedback_question" to "service_role";

grant insert on table "public"."feedback_question" to "service_role";

grant references on table "public"."feedback_question" to "service_role";

grant select on table "public"."feedback_question" to "service_role";

grant trigger on table "public"."feedback_question" to "service_role";

grant truncate on table "public"."feedback_question" to "service_role";

grant update on table "public"."feedback_question" to "service_role";


