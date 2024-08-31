create table "public"."article_group_manager" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now(),
    "reference_name" text,
    "heading" text,
    "subheading" text,
    "articles" json,
    "shareable_id" uuid default gen_random_uuid()
);


alter table "public"."posts" add column "shareable_id" uuid default gen_random_uuid();

CREATE UNIQUE INDEX article_group_manager_pkey ON public.article_group_manager USING btree (id);

alter table "public"."article_group_manager" add constraint "article_group_manager_pkey" PRIMARY KEY using index "article_group_manager_pkey";

grant delete on table "public"."article_group_manager" to "anon";

grant insert on table "public"."article_group_manager" to "anon";

grant references on table "public"."article_group_manager" to "anon";

grant select on table "public"."article_group_manager" to "anon";

grant trigger on table "public"."article_group_manager" to "anon";

grant truncate on table "public"."article_group_manager" to "anon";

grant update on table "public"."article_group_manager" to "anon";

grant delete on table "public"."article_group_manager" to "authenticated";

grant insert on table "public"."article_group_manager" to "authenticated";

grant references on table "public"."article_group_manager" to "authenticated";

grant select on table "public"."article_group_manager" to "authenticated";

grant trigger on table "public"."article_group_manager" to "authenticated";

grant truncate on table "public"."article_group_manager" to "authenticated";

grant update on table "public"."article_group_manager" to "authenticated";

grant delete on table "public"."article_group_manager" to "service_role";

grant insert on table "public"."article_group_manager" to "service_role";

grant references on table "public"."article_group_manager" to "service_role";

grant select on table "public"."article_group_manager" to "service_role";

grant trigger on table "public"."article_group_manager" to "service_role";

grant truncate on table "public"."article_group_manager" to "service_role";

grant update on table "public"."article_group_manager" to "service_role";


