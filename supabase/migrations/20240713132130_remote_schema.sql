create table "public"."contact_form" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text,
    "email" text,
    "phone" text,
    "message" text,
    "internal__status" text default 'UNSEEN'::text,
    "internal__date_views" timestamp with time zone
);


create table "public"."website_settings" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "robots_txt" text,
    "logo_id" text,
    "logo_alt_text" text,
    "logo_url" text,
    "website_url" text
);


alter table "public"."posts" drop column "publish_date";

alter table "public"."posts" drop column "tags";

alter table "public"."posts" alter column "publish_date_day" set default CURRENT_DATE;

alter table "public"."posts" alter column "publish_date_time" set default '09:00:00'::time without time zone;

CREATE UNIQUE INDEX "contact-form_pkey" ON public.contact_form USING btree (id);

CREATE UNIQUE INDEX website_settings_pkey ON public.website_settings USING btree (id);

alter table "public"."contact_form" add constraint "contact-form_pkey" PRIMARY KEY using index "contact-form_pkey";

alter table "public"."website_settings" add constraint "website_settings_pkey" PRIMARY KEY using index "website_settings_pkey";

grant delete on table "public"."contact_form" to "anon";

grant insert on table "public"."contact_form" to "anon";

grant references on table "public"."contact_form" to "anon";

grant select on table "public"."contact_form" to "anon";

grant trigger on table "public"."contact_form" to "anon";

grant truncate on table "public"."contact_form" to "anon";

grant update on table "public"."contact_form" to "anon";

grant delete on table "public"."contact_form" to "authenticated";

grant insert on table "public"."contact_form" to "authenticated";

grant references on table "public"."contact_form" to "authenticated";

grant select on table "public"."contact_form" to "authenticated";

grant trigger on table "public"."contact_form" to "authenticated";

grant truncate on table "public"."contact_form" to "authenticated";

grant update on table "public"."contact_form" to "authenticated";

grant delete on table "public"."contact_form" to "service_role";

grant insert on table "public"."contact_form" to "service_role";

grant references on table "public"."contact_form" to "service_role";

grant select on table "public"."contact_form" to "service_role";

grant trigger on table "public"."contact_form" to "service_role";

grant truncate on table "public"."contact_form" to "service_role";

grant update on table "public"."contact_form" to "service_role";

grant delete on table "public"."website_settings" to "anon";

grant insert on table "public"."website_settings" to "anon";

grant references on table "public"."website_settings" to "anon";

grant select on table "public"."website_settings" to "anon";

grant trigger on table "public"."website_settings" to "anon";

grant truncate on table "public"."website_settings" to "anon";

grant update on table "public"."website_settings" to "anon";

grant delete on table "public"."website_settings" to "authenticated";

grant insert on table "public"."website_settings" to "authenticated";

grant references on table "public"."website_settings" to "authenticated";

grant select on table "public"."website_settings" to "authenticated";

grant trigger on table "public"."website_settings" to "authenticated";

grant truncate on table "public"."website_settings" to "authenticated";

grant update on table "public"."website_settings" to "authenticated";

grant delete on table "public"."website_settings" to "service_role";

grant insert on table "public"."website_settings" to "service_role";

grant references on table "public"."website_settings" to "service_role";

grant select on table "public"."website_settings" to "service_role";

grant trigger on table "public"."website_settings" to "service_role";

grant truncate on table "public"."website_settings" to "service_role";

grant update on table "public"."website_settings" to "service_role";


