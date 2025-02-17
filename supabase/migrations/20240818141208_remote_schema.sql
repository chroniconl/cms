create table "public"."chroniconl__trendy__url_history" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "full_url" text,
    "page_title" text,
    "raw_contents" text,
    "head_content_only" text,
    "body_content_only" text
);


alter table "public"."__raw_logs" add column "nextUrl" text;

alter table "public"."__raw_logs" add column "request_cookies" text;

alter table "public"."__raw_logs" add column "request_geo" text;

alter table "public"."__raw_logs" add column "request_headers" jsonb;

alter table "public"."__raw_trends" add column "scenario" text;

alter table "public"."posts" add column "character_count" integer;

alter table "public"."posts" add column "last_updated" timestamp with time zone;

alter table "public"."posts" add column "word_count" integer;

CREATE UNIQUE INDEX chroniconl__trendy__url_history_pkey ON public.chroniconl__trendy__url_history USING btree (id);

CREATE UNIQUE INDEX "repo_trends_fullName_key" ON public.repo_trends USING btree ("fullName");

alter table "public"."chroniconl__trendy__url_history" add constraint "chroniconl__trendy__url_history_pkey" PRIMARY KEY using index "chroniconl__trendy__url_history_pkey";

alter table "public"."repo_trends" add constraint "repo_trends_fullName_key" UNIQUE using index "repo_trends_fullName_key";

grant delete on table "public"."chroniconl__trendy__url_history" to "anon";

grant insert on table "public"."chroniconl__trendy__url_history" to "anon";

grant references on table "public"."chroniconl__trendy__url_history" to "anon";

grant select on table "public"."chroniconl__trendy__url_history" to "anon";

grant trigger on table "public"."chroniconl__trendy__url_history" to "anon";

grant truncate on table "public"."chroniconl__trendy__url_history" to "anon";

grant update on table "public"."chroniconl__trendy__url_history" to "anon";

grant delete on table "public"."chroniconl__trendy__url_history" to "authenticated";

grant insert on table "public"."chroniconl__trendy__url_history" to "authenticated";

grant references on table "public"."chroniconl__trendy__url_history" to "authenticated";

grant select on table "public"."chroniconl__trendy__url_history" to "authenticated";

grant trigger on table "public"."chroniconl__trendy__url_history" to "authenticated";

grant truncate on table "public"."chroniconl__trendy__url_history" to "authenticated";

grant update on table "public"."chroniconl__trendy__url_history" to "authenticated";

grant delete on table "public"."chroniconl__trendy__url_history" to "service_role";

grant insert on table "public"."chroniconl__trendy__url_history" to "service_role";

grant references on table "public"."chroniconl__trendy__url_history" to "service_role";

grant select on table "public"."chroniconl__trendy__url_history" to "service_role";

grant trigger on table "public"."chroniconl__trendy__url_history" to "service_role";

grant truncate on table "public"."chroniconl__trendy__url_history" to "service_role";

grant update on table "public"."chroniconl__trendy__url_history" to "service_role";


