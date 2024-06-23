create table "public"."authors" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now(),
    "display_name" text,
    "href" text,
    "avatar_url" text,
    "created_by" uuid,
    "avatar_id" text
);


create table "public"."categories" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "last_updated" timestamp with time zone default now(),
    "name" text,
    "slug" text,
    "color" text,
    "description" text
);


create table "public"."newsletter_subscribers" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "email" text not null
);


create table "public"."orgs" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "last_updated" timestamp with time zone default now(),
    "name" text,
    "slug" text,
    "owner_id" uuid not null,
    "short_code" text
);


create table "public"."post_tag_relationship" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "tag_id" uuid,
    "post_id" uuid,
    "created_by" uuid
);


create table "public"."posts" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "content" text,
    "title" text,
    "slug" text,
    "tags" text,
    "category_id" uuid,
    "visibility" text,
    "description" text,
    "publish_date" timestamp with time zone,
    "user_id" uuid,
    "image_url" text,
    "image_alt" text,
    "image_caption" text,
    "image_id" text,
    "publish_date_day" date,
    "publish_date_time" time without time zone,
    "author_id" uuid
);


create table "public"."tags" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "last_updated" timestamp with time zone default now(),
    "name" text,
    "slug" text,
    "created_by" uuid
);


create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" text,
    "provider" text
);


CREATE UNIQUE INDEX authors_pkey ON public.authors USING btree (id);

CREATE UNIQUE INDEX categories_pkey ON public.categories USING btree (id);

CREATE UNIQUE INDEX newsletter_pkey ON public.newsletter_subscribers USING btree (id);

CREATE UNIQUE INDEX newsletter_subscribers_email_key ON public.newsletter_subscribers USING btree (email);

CREATE UNIQUE INDEX org_pkey ON public.orgs USING btree (id);

CREATE UNIQUE INDEX post_tag_relationship_pkey ON public.post_tag_relationship USING btree (id);

CREATE UNIQUE INDEX tags_pkey ON public.tags USING btree (id);

CREATE UNIQUE INDEX tags_slug_key ON public.tags USING btree (slug);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX users_user_id_key ON public.users USING btree (user_id);

CREATE UNIQUE INDEX wgu_docs_duplicate_pkey ON public.posts USING btree (id);

CREATE UNIQUE INDEX wgu_docs_duplicate_slug_key ON public.posts USING btree (slug);

alter table "public"."authors" add constraint "authors_pkey" PRIMARY KEY using index "authors_pkey";

alter table "public"."categories" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."newsletter_subscribers" add constraint "newsletter_pkey" PRIMARY KEY using index "newsletter_pkey";

alter table "public"."orgs" add constraint "org_pkey" PRIMARY KEY using index "org_pkey";

alter table "public"."post_tag_relationship" add constraint "post_tag_relationship_pkey" PRIMARY KEY using index "post_tag_relationship_pkey";

alter table "public"."posts" add constraint "wgu_docs_duplicate_pkey" PRIMARY KEY using index "wgu_docs_duplicate_pkey";

alter table "public"."tags" add constraint "tags_pkey" PRIMARY KEY using index "tags_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."authors" add constraint "authors_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) not valid;

alter table "public"."authors" validate constraint "authors_created_by_fkey";

alter table "public"."newsletter_subscribers" add constraint "newsletter_subscribers_email_key" UNIQUE using index "newsletter_subscribers_email_key";

alter table "public"."orgs" add constraint "orgs_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES users(id) not valid;

alter table "public"."orgs" validate constraint "orgs_owner_id_fkey";

alter table "public"."post_tag_relationship" add constraint "post_tag_relationship_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) not valid;

alter table "public"."post_tag_relationship" validate constraint "post_tag_relationship_created_by_fkey";

alter table "public"."post_tag_relationship" add constraint "post_tag_relationship_post_id_fkey" FOREIGN KEY (post_id) REFERENCES posts(id) not valid;

alter table "public"."post_tag_relationship" validate constraint "post_tag_relationship_post_id_fkey";

alter table "public"."post_tag_relationship" add constraint "post_tag_relationship_tag_id_fkey" FOREIGN KEY (tag_id) REFERENCES tags(id) not valid;

alter table "public"."post_tag_relationship" validate constraint "post_tag_relationship_tag_id_fkey";

alter table "public"."posts" add constraint "posts_author_id_fkey" FOREIGN KEY (author_id) REFERENCES authors(id) not valid;

alter table "public"."posts" validate constraint "posts_author_id_fkey";

alter table "public"."posts" add constraint "posts_category_id_fkey" FOREIGN KEY (category_id) REFERENCES categories(id) not valid;

alter table "public"."posts" validate constraint "posts_category_id_fkey";

alter table "public"."posts" add constraint "posts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."posts" validate constraint "posts_user_id_fkey";

alter table "public"."posts" add constraint "wgu_docs_duplicate_slug_key" UNIQUE using index "wgu_docs_duplicate_slug_key";

alter table "public"."tags" add constraint "tags_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) not valid;

alter table "public"."tags" validate constraint "tags_created_by_fkey";

alter table "public"."tags" add constraint "tags_slug_key" UNIQUE using index "tags_slug_key";

alter table "public"."users" add constraint "users_user_id_key" UNIQUE using index "users_user_id_key";

grant delete on table "public"."authors" to "anon";

grant insert on table "public"."authors" to "anon";

grant references on table "public"."authors" to "anon";

grant select on table "public"."authors" to "anon";

grant trigger on table "public"."authors" to "anon";

grant truncate on table "public"."authors" to "anon";

grant update on table "public"."authors" to "anon";

grant delete on table "public"."authors" to "authenticated";

grant insert on table "public"."authors" to "authenticated";

grant references on table "public"."authors" to "authenticated";

grant select on table "public"."authors" to "authenticated";

grant trigger on table "public"."authors" to "authenticated";

grant truncate on table "public"."authors" to "authenticated";

grant update on table "public"."authors" to "authenticated";

grant delete on table "public"."authors" to "service_role";

grant insert on table "public"."authors" to "service_role";

grant references on table "public"."authors" to "service_role";

grant select on table "public"."authors" to "service_role";

grant trigger on table "public"."authors" to "service_role";

grant truncate on table "public"."authors" to "service_role";

grant update on table "public"."authors" to "service_role";

grant delete on table "public"."categories" to "anon";

grant insert on table "public"."categories" to "anon";

grant references on table "public"."categories" to "anon";

grant select on table "public"."categories" to "anon";

grant trigger on table "public"."categories" to "anon";

grant truncate on table "public"."categories" to "anon";

grant update on table "public"."categories" to "anon";

grant delete on table "public"."categories" to "authenticated";

grant insert on table "public"."categories" to "authenticated";

grant references on table "public"."categories" to "authenticated";

grant select on table "public"."categories" to "authenticated";

grant trigger on table "public"."categories" to "authenticated";

grant truncate on table "public"."categories" to "authenticated";

grant update on table "public"."categories" to "authenticated";

grant delete on table "public"."categories" to "service_role";

grant insert on table "public"."categories" to "service_role";

grant references on table "public"."categories" to "service_role";

grant select on table "public"."categories" to "service_role";

grant trigger on table "public"."categories" to "service_role";

grant truncate on table "public"."categories" to "service_role";

grant update on table "public"."categories" to "service_role";

grant delete on table "public"."newsletter_subscribers" to "anon";

grant insert on table "public"."newsletter_subscribers" to "anon";

grant references on table "public"."newsletter_subscribers" to "anon";

grant select on table "public"."newsletter_subscribers" to "anon";

grant trigger on table "public"."newsletter_subscribers" to "anon";

grant truncate on table "public"."newsletter_subscribers" to "anon";

grant update on table "public"."newsletter_subscribers" to "anon";

grant delete on table "public"."newsletter_subscribers" to "authenticated";

grant insert on table "public"."newsletter_subscribers" to "authenticated";

grant references on table "public"."newsletter_subscribers" to "authenticated";

grant select on table "public"."newsletter_subscribers" to "authenticated";

grant trigger on table "public"."newsletter_subscribers" to "authenticated";

grant truncate on table "public"."newsletter_subscribers" to "authenticated";

grant update on table "public"."newsletter_subscribers" to "authenticated";

grant delete on table "public"."newsletter_subscribers" to "service_role";

grant insert on table "public"."newsletter_subscribers" to "service_role";

grant references on table "public"."newsletter_subscribers" to "service_role";

grant select on table "public"."newsletter_subscribers" to "service_role";

grant trigger on table "public"."newsletter_subscribers" to "service_role";

grant truncate on table "public"."newsletter_subscribers" to "service_role";

grant update on table "public"."newsletter_subscribers" to "service_role";

grant delete on table "public"."orgs" to "anon";

grant insert on table "public"."orgs" to "anon";

grant references on table "public"."orgs" to "anon";

grant select on table "public"."orgs" to "anon";

grant trigger on table "public"."orgs" to "anon";

grant truncate on table "public"."orgs" to "anon";

grant update on table "public"."orgs" to "anon";

grant delete on table "public"."orgs" to "authenticated";

grant insert on table "public"."orgs" to "authenticated";

grant references on table "public"."orgs" to "authenticated";

grant select on table "public"."orgs" to "authenticated";

grant trigger on table "public"."orgs" to "authenticated";

grant truncate on table "public"."orgs" to "authenticated";

grant update on table "public"."orgs" to "authenticated";

grant delete on table "public"."orgs" to "service_role";

grant insert on table "public"."orgs" to "service_role";

grant references on table "public"."orgs" to "service_role";

grant select on table "public"."orgs" to "service_role";

grant trigger on table "public"."orgs" to "service_role";

grant truncate on table "public"."orgs" to "service_role";

grant update on table "public"."orgs" to "service_role";

grant delete on table "public"."post_tag_relationship" to "anon";

grant insert on table "public"."post_tag_relationship" to "anon";

grant references on table "public"."post_tag_relationship" to "anon";

grant select on table "public"."post_tag_relationship" to "anon";

grant trigger on table "public"."post_tag_relationship" to "anon";

grant truncate on table "public"."post_tag_relationship" to "anon";

grant update on table "public"."post_tag_relationship" to "anon";

grant delete on table "public"."post_tag_relationship" to "authenticated";

grant insert on table "public"."post_tag_relationship" to "authenticated";

grant references on table "public"."post_tag_relationship" to "authenticated";

grant select on table "public"."post_tag_relationship" to "authenticated";

grant trigger on table "public"."post_tag_relationship" to "authenticated";

grant truncate on table "public"."post_tag_relationship" to "authenticated";

grant update on table "public"."post_tag_relationship" to "authenticated";

grant delete on table "public"."post_tag_relationship" to "service_role";

grant insert on table "public"."post_tag_relationship" to "service_role";

grant references on table "public"."post_tag_relationship" to "service_role";

grant select on table "public"."post_tag_relationship" to "service_role";

grant trigger on table "public"."post_tag_relationship" to "service_role";

grant truncate on table "public"."post_tag_relationship" to "service_role";

grant update on table "public"."post_tag_relationship" to "service_role";

grant delete on table "public"."posts" to "anon";

grant insert on table "public"."posts" to "anon";

grant references on table "public"."posts" to "anon";

grant select on table "public"."posts" to "anon";

grant trigger on table "public"."posts" to "anon";

grant truncate on table "public"."posts" to "anon";

grant update on table "public"."posts" to "anon";

grant delete on table "public"."posts" to "authenticated";

grant insert on table "public"."posts" to "authenticated";

grant references on table "public"."posts" to "authenticated";

grant select on table "public"."posts" to "authenticated";

grant trigger on table "public"."posts" to "authenticated";

grant truncate on table "public"."posts" to "authenticated";

grant update on table "public"."posts" to "authenticated";

grant delete on table "public"."posts" to "service_role";

grant insert on table "public"."posts" to "service_role";

grant references on table "public"."posts" to "service_role";

grant select on table "public"."posts" to "service_role";

grant trigger on table "public"."posts" to "service_role";

grant truncate on table "public"."posts" to "service_role";

grant update on table "public"."posts" to "service_role";

grant delete on table "public"."tags" to "anon";

grant insert on table "public"."tags" to "anon";

grant references on table "public"."tags" to "anon";

grant select on table "public"."tags" to "anon";

grant trigger on table "public"."tags" to "anon";

grant truncate on table "public"."tags" to "anon";

grant update on table "public"."tags" to "anon";

grant delete on table "public"."tags" to "authenticated";

grant insert on table "public"."tags" to "authenticated";

grant references on table "public"."tags" to "authenticated";

grant select on table "public"."tags" to "authenticated";

grant trigger on table "public"."tags" to "authenticated";

grant truncate on table "public"."tags" to "authenticated";

grant update on table "public"."tags" to "authenticated";

grant delete on table "public"."tags" to "service_role";

grant insert on table "public"."tags" to "service_role";

grant references on table "public"."tags" to "service_role";

grant select on table "public"."tags" to "service_role";

grant trigger on table "public"."tags" to "service_role";

grant truncate on table "public"."tags" to "service_role";

grant update on table "public"."tags" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";


