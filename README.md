# Chroniconl CMS

[![MIT License](https://img.shields.io/badge/license-MIT-yellow.svg)](./LICENSE)

This is the public source code for a content management system for content heavy websites. Deploy to Vercel, and use the built in CMS to manage your content. **NOTE: This project used premium features in the services we use. Please be aware of the costs before using this project.**

## Table of Contents

- [Why?](#why)
- [Getting Started](#getting-started)
- [About the Stack](#about-the-stack)
- [FAQ](#faq-stack-questions)
- [Contributing / Bug Reports](#contributing--bug-reports)

## Why?

Why build a CMS when you could use one of the many alternatives?

1. A need to remain close to the source code while providing a flexible admin experience.
2. To build a writers experience that doesn't suck.
3. To provide all the benefits of a highly secured CMS out of the box.

## Getting Started

### Prerequisites and accounts required

- Node.js 18.x
- Pnpm 7.x
- GitHub account (Some knowledge of Git is required)
- $ Vercel account (Hosting)
- $ Supabase account (API keys required)
- $ Clerk account (API keys required)
- $ UploadThing account (API keys required)
- $ PostHog account (API keys required)

### Installation

#### 1. Clone the repo

First, clone the repo:

```shell
git clone https://github.com/matthewbub/chroniconl-cms.git
```

#### 2. Install dependencies with `pnpm install`

Navigate to the root directory and run `pnpm install`.

```shell
cd chroniconl-cms
pnpm install
```

#### 3. Create a `.env.local` file in the root directory

You can use the `example.env.local` file as a template for your `.env.local` file. Note the comments in the file, follow the links provided to obtain your API keys. **If you try to start the project without these keys, you'll run into errors or at the least, unexpected behavior.**

```shell
# Development Options
DEV=true # or DEVELOPMENT=true

# Site URL
# Example: https://example.com
NEXT_PUBLIC_SITE_URL=

# https://dashboard.clerk.com/apps
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# You don't need to change these!
# They map to files we've defined in the app router `./src/app/*`
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# https://supabase.com/dashboard/project/
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# https://uploadthing.com/dashboard/<project-id>/api-keys
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# https://posthog.com/settings/api-key
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

### Initialize Supabase

In order to use Supabase, you'll need to create a new project and add a few tables. From the SQL tab, copy and paste the following SQL into the Supabase console and run it.1

```sql
create table
  public.users (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    user_id text null,
    provider text null,
    constraint users_pkey primary key (id),
    constraint users_user_id_key unique (user_id)
  ) tablespace pg_default;

create table
  public.posts (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    content text null,
    title text null,
    slug text null,
    tags text null,
    category_id uuid null,
    visibility text null,
    description text null,
    publish_date timestamp with time zone null,
    user_id uuid null,
    image_url text null,
    image_alt text null,
    image_caption text null,
    image_id text null,
    publish_date_day date null,
    publish_date_time time without time zone null,
    author_id uuid null,
    constraint wgu_docs_duplicate_pkey primary key (id),
    constraint wgu_docs_duplicate_slug_key unique (slug),
    constraint posts_author_id_fkey foreign key (author_id) references authors (id),
    constraint posts_category_id_fkey foreign key (category_id) references categories (id),
    constraint posts_user_id_fkey foreign key (user_id) references users (id)
  ) tablespace pg_default;

create table
  public.post_tag_relationship (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    tag_id uuid null,
    post_id uuid null,
    created_by uuid null,
    constraint post_tag_relationship_pkey primary key (id),
    constraint post_tag_relationship_created_by_fkey foreign key (created_by) references users (id),
    constraint post_tag_relationship_post_id_fkey foreign key (post_id) references posts (id),
    constraint post_tag_relationship_tag_id_fkey foreign key (tag_id) references tags (id)
  ) tablespace pg_default;

create table
  public.newsletter_subscribers (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    email text not null,
    constraint newsletter_pkey primary key (id),
    constraint newsletter_subscribers_email_key unique (email)
  ) tablespace pg_default;

create table
  public.categories (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    last_updated timestamp with time zone null default now(),
    name text null,
    slug text null,
    color text null,
    description text null,
    constraint categories_pkey primary key (id)
  ) tablespace pg_default;

create table
  public.authors (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone null default now(),
    display_name text null,
    href text null,
    avatar_url text null,
    created_by uuid null,
    avatar_id text null,
    twitter_handle text null,
    constraint authors_pkey primary key (id),
    constraint authors_created_by_fkey foreign key (created_by) references users (id)
  ) tablespace pg_default;

create table
  public.tags (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    last_updated timestamp with time zone null default now(),
    name text null,
    slug text null,
    created_by uuid null,
    constraint tags_pkey primary key (id),
    constraint tags_slug_key unique (slug),
    constraint tags_created_by_fkey foreign key (created_by) references users (id)
  ) tablespace pg_default;
```

### Start the project

Now that you have your `.env.local` file set up, and storage is setup in Supabase, you can start the project.

```shell
pnpm dev
```

This will start the project in development mode, and you can make changes to the code and see the changes in real-time. Visit `http://localhost:3000` to view the project.

### Deploy to Vercel

Once you're ready to deploy, you can use Vercel to deploy the project to your own domain.

1. Create a Vercel account if you don't already have one.
2. Navigate to the project on Vercel.
3. Click the "Deploy" button.
4. Follow the prompts to deploy the project to your own domain.

## About the Stack

Next.js (app router) x TypeScript, TailwindCSS x shadcn/ui, Zustand, Supabase, Clerk, UploadThing, Vercel, TipTap is a pretty integral part of this app's interface too.

### Why Clerk, isn't that expensive?

Initially the auth provider was admin-only. We'll be migrating to Supabase Auth soon.

### Can I change the auth provider?

Yeah, the `users` table is flexible in that aspect. When you create a new user, you can set the `provider` to any value you want. We default to `clerk` but you can change it to `supabase` or `auth0` for example, whatever you want.

### Why UploadThing?

An easy way support [Theo](https://twitter.com/t3dotgg); because he keeps me entertained for hours, plus the pricing is rad.

### Why TipTap?

Best user experience for writing content in a rich text editor (WYSIWYG). It's great now, and I have no reason besides past experiences to be skeptical, but I'm super nervous about maintenance around this package. Mostly being that ain't nobody going to be fork and maintain this project if the open-source version gets abandoned. _Basically, if for any reason we have to migrate to another rich text editor, we'll be in some shit._

### Why not use Markdown and static pages like a regular person?

Static blogs are cool for solo developers or teams that publish relatively infrequently. This project initlly began as a static blog but has since scaled to a full CMS.

### Why Zustand?

Because Redux seems mildly unnecessary for this project.

### Why Supabase?

Supabase provides a safe way to scale this project quickly. It provides this front-end focused project peace-of-mind.

## Contributing / Bug Reports

We'd be appreciative of bug reports/ fixes, and would gladly accept new proposals.

If you'd like to contribute to an existing issue, kindly communicate through the designated ticket to avoid overlapping efforts. Check out the [Open Issues](https://github.com/matthewbub/chroniconl-cms/issues?q=is%3Aissue+is%3Aopen) and our Contributing Guide for more information.

This project requires Node.js and pnpm to be installed. If needed, you can install them from Node.js website and pnpm website.

### Contributors Setup

1. Fork this repository
2. Clone the forked repository to your local machine, or open a new Code Space
3. Checkout to a clean branch. e.g git checkout feature/addSomeCode (Please be more descriptive)
4. (Follow the steps in [Getting Started](#getting-started) to install dependencies)
5. You're all set up. Run pnpm run build to run the production build and ensure everything is working. If not, please open an issue in https://github.com/matthewbub/chroniconl-cms/issues 🙂

## FAQ

### Why is my Blog Post not showing up?

If you've already created a blog post and are expecting it to show up on the homepage or be accessible via direct link, make sure you've set the posts "Visibility" field to "Public". In addition, ensure the "Publish Date" field is set to a point in the past.
