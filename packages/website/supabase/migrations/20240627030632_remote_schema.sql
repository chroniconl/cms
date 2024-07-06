revoke delete on table "public"."orgs" from "anon";

revoke insert on table "public"."orgs" from "anon";

revoke references on table "public"."orgs" from "anon";

revoke select on table "public"."orgs" from "anon";

revoke trigger on table "public"."orgs" from "anon";

revoke truncate on table "public"."orgs" from "anon";

revoke update on table "public"."orgs" from "anon";

revoke delete on table "public"."orgs" from "authenticated";

revoke insert on table "public"."orgs" from "authenticated";

revoke references on table "public"."orgs" from "authenticated";

revoke select on table "public"."orgs" from "authenticated";

revoke trigger on table "public"."orgs" from "authenticated";

revoke truncate on table "public"."orgs" from "authenticated";

revoke update on table "public"."orgs" from "authenticated";

revoke delete on table "public"."orgs" from "service_role";

revoke insert on table "public"."orgs" from "service_role";

revoke references on table "public"."orgs" from "service_role";

revoke select on table "public"."orgs" from "service_role";

revoke trigger on table "public"."orgs" from "service_role";

revoke truncate on table "public"."orgs" from "service_role";

revoke update on table "public"."orgs" from "service_role";

alter table "public"."orgs" drop constraint "orgs_owner_id_fkey";

alter table "public"."orgs" drop constraint "org_pkey";

drop index if exists "public"."org_pkey";

drop table "public"."orgs";

alter table "public"."authors" add column "twitter_handle" text;


