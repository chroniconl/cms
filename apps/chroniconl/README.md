# Chroniconl CMS

[![MIT License](https://img.shields.io/badge/license-MIT-yellow.svg)](./LICENSE)

Next.js (app router) x TypeScript, TailwindCSS x shadcn/ui, Zustand, Supabase, Clerk, UploadThing, Vercel, TipTap is a pretty integral part of this app's interface too.

## About the Stack

### Why Clerk, isn't that expensive?

Initially the auth provider was admin-only. We'll be migrating to Supabase Auth soon.

### Can I change the auth provider?

Yeah, the `users` table is flexible in that aspect. When you create a new user, you can set the `provider` to any value you want. We default to `clerk` but you can change it to `supabase` or `auth0` for example, whatever you want.

### Why UploadThing?

An easy way support [Theo](https://twitter.com/t3dotgg); because he keeps me entertained for hours, plus the pricing is rad.

### Why TipTap?

Best user experience for writing content in a rich text editor (WYSIWYG). It's great now, and I have no reason besides past experiences to be skeptical, but I'm super nervous about maintenance around this package. Mostly being that ain't nobody going to be fork and maintain this project if the open-source version gets abandoned. _Basically, if for any reason we have to migrate to another rich text editor, we'll be in some shit._

### Why not use Markdown and static pages like a regular person?

Static blogs are cool for solo developers or teams that publish relatively infrequently. This project initially began as a static blog but has since scaled to a full CMS.

### Why Zustand?

Because Redux seems mildly unnecessary for this project.

### Why Supabase?

Supabase provides a safe way to scale this project quickly. It provides this front-end focused project peace-of-mind.
