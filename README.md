# Chroniconl

[![MIT License](https://img.shields.io/badge/license-MIT-yellow.svg)](./LICENSE)

Just a fun project I'm working on.

## Features

**Observatory (Preview)**

Work with raw HTML content to consult AI / preform common tasks.

<img src="https://azhrbvulmwgxcijoaenn.supabase.co/storage/v1/object/public/my-blog/ObserverToolBeta.png" width="400px" />

Blog post management

<img src="https://utfs.io/f/de9040b8-09c8-4c22-97b5-016af9032942-8jt8nz.png" width="400px" />

Post dashboard

<img src="https://utfs.io/f/fa6598a9-f42b-41c4-adeb-7772a7773ab0-ft8p6c.png" width="400px" />

Media gallery

<img src="https://utfs.io/f/2fb013f8-3ef0-48c2-915c-608ec8b8ac81-vu6z6v.png" width="400px" />

More coming soon...

## Table of Contents

- [Why?](#why)
- [Getting Started](#getting-started)
- [Contributing / Bug Reports](#contributing--bug-reports)

## Why?

Why build a CMS when you could use one of the many alternatives?

1. I'm having fun taking this project as far as it can go.

## Getting Started

### Prerequisites and accounts required

- Node.js
- Pnpm
- GitHub account (Some knowledge of Git is required)
- $ Vercel account (Hosting)
- $ Supabase account (API keys required)
- $ Clerk account (API keys required)
- $ Resend account (API keys required)

> I'm working on consolidating some of these. Please check back soon or consider contributing if you'd like to help out.

### Installation

#### 1. Clone the repo

First, clone the repo:

```shell
git clone https://github.com/chroniconl/cms
```

#### 2. Install dependencies with `pnpm install`

Navigate to the root directory and run `pnpm install`.

```shell
cd cms
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
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_STORAGE_BUCKET_URL=

RESEND_KEY=
ADMIN_EMAIL=
```

Follow the steps in the [Supabase](./docs/Supabase.md) doc to get setup with Supabase.

### Start the project

Now that you have your `.env.local` file set up, and storage is setup in Supabase, you can start the project.

```shell
pnpm run dev
```

This will start the project in development mode, and you can make changes to the code and see the changes in real-time. Visit `http://localhost:3000` to view the project.

### Deploy to Vercel

Once you're ready to deploy, you can use Vercel to deploy the project to your own domain.

1. Create a Vercel account if you don't already have one.
2. Navigate to the project on Vercel.
3. Click the "Deploy" button.
4. Follow the prompts to deploy the project to your own domain.

### Contributors Setup

1. Fork this repository
2. Clone the forked repository to your local machine, or open a new Code Space
3. Checkout to a clean branch. e.g git checkout feature/addSomeCode (Please be more descriptive)
4. (Follow the steps in [Getting Started](#getting-started) to install dependencies)
5. You're all set up. Run pnpm run build to run the production build and ensure everything is working. If not, please open an issue in https://github.com/chroniconl/cms/issues 🙂

## FAQ

### Can you elaborate on why WordPress can't solve your problem?

Security for the most part. I once deployed api.chroniconl.com to Digital Ocean and not even 15 minutes later I had bots crawling my site for what I assume to be potential vulnerabilities in WordPress architecture. This is the kind of behavior I often see.

<img src="https://azhrbvulmwgxcijoaenn.supabase.co/storage/v1/object/public/my-blog/ThisIsWhyISayNoWordPress.png" height="400px" />

### Why is my Blog Post not showing up?

If you've already created a blog post and are expecting it to show up on the homepage or be accessible via direct link, make sure you've set the posts "Visibility" field to "Public". In addition, ensure the "Publish Date" field is set to a point in the past.
