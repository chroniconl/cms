# Supabase

[Supabase](https://supabase.com/) is a PostgreSQL wrapper that provides data storage for this application. Supabase wins for it's ease-of-use within the JavaScript community. In addition, there's a generous free plan that makes getting started achievable for everyone. For more backend oriented folks; the self-hosting aspect allows for the traditional development experience if one should choose to go that route.

**Setup Supabase**

The easiest way to setup Supabase is via the Supabase CLI. Try these steps to get setup, if you have any questions or encounter issues; kindly open a new issue in this repository or email <6matbub@gmail.com> with the subject "Chroniconl CMS Support" and I (Mat) will get back to you.

1. From your Supabase Dashboard, create a new database (Password will be needed in Step 4).
2. Install the CLI https://supabase.com/docs/guides/cli/getting-started
3. From within the root directory of this repository, run `supabase login` to connect to your Supabase account
4. Run `supabase link` and select the database you created. Follow the prompts to connect, you may need the password you created in step 1.
5. Run `supabase db push` to push the supabase/migrations into your Supabase database.
6. Your Supabase database should now be populated with the schema required to run the application.

## Supabase CLI

Generate Typescript types from the Supabase schema

```bash
npx supabase gen types --lang=typescript --project-id "$PROJECT_REF" --schema public > database.types.ts
```
