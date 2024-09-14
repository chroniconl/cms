# Logging in Next.js App Router Tutorial

Here's what we'll be setting out to accomplish in this tutorial.

1. Setup the logger, and configured it to report errors.
2. Implement performance monitoring to observe time it takes to complete tasks.
3. Implement additional security measures that track the origin of the request, and user that sent the request.

## Error Logging Public Routes

We'll start with a simple example copied from the `src/app/api/v0/categories/route.ts` route. So far, we've created a HTTP GET request via a Next.js Edge Function in the App Router. We use the Edge Function to query the Supabase SDK for the fields needed from the categories table, then ultimately send the response to the user.

The next step we're going to want to take will be to import and initialize a new instance of the logger. Lucky for us, the `Logger` class takes care of a-lot of the boilerplate configuration. All we need to do is pass the logger a unique name upon initialization.

<!-- > Why does each logger need a unique name? <br>
<img src="https://azhrbvulmwgxcijoaenn.supabase.co/storage/v1/object/public/my-blog/WhyUseUniqueLoggerNames.png" height="100px"> -->

```ts
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, color')

  if (error) {
    return failResponse(error?.message)
  }

  return okResponse(data)
}
```

Let's import the `Logger` from the `@/utils/logger` path and get the logger initialized. Don't think too deeply into the name, just ensure it's unique and try to follow [the convention already established](#technical-details).

```ts
// ...
// 1. Import the logger
import Logger from '@/utils/logger'

export async function GET() {
  // 2. Initialize the logger
  const logger = new Logger({
    name: 'api.v0.categories.GET',
  })

  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, color')

  if (error) {
    return failResponse(error?.message)
  }

  return okResponse(data)
}
```

A great first step, but we're not doing anything with the logger yet. Let's log a response to the `if (error) ...` conditional statement. At it's most bare-bones level, we could implement the error logger as seen in step 3 of the code comments below:

```ts
// ...
// 1. Import the logger
import Logger from '@/utils/logger'

export async function GET() {
  // 2. Initialize the logger
  const logger = new Logger({
    name: 'api.v0.categories.GET',
  })

  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, color')

  if (error) {
    // 3. Log the error
    void logger.logError({
      message: error,
      error_code: 'DATABASE_ERROR',
    })

    return failResponse(error?.message)
  }

  return okResponse(data)
}
```

The `error_code` field is originating from our [ERROR_CODES](./ERROR_CODES.md) document and we should always restrict use of ERROR_CODES to those already available.

As you get more comfortable working with error codes, you can take advantage of error-code specific loggers to reduce the noise when calling a log. For example, observe the following refactor:

```ts
// 3. Log the error
void logger.logError({
  message: error,
  error_code: 'DATABASE_ERROR',
})

// Could be reduced to
void logger.logDatabaseError(error)
```

**Which logger should I use?**

Which ever you feel more comfortable with! Code committed to the core-repository will have stricter standards, e.g we prefer the explicit `logDatabaseError` method, but we're not going to hold you to those same standards.

Now obviously the second one feels lighter, but I could totally see how it would be annoying trying to remember all of the unique error code methods while getting started. I might recommend using the more generic approach, then using your IDE to fuzzy find say, all instances matching `error_code: 'DATABASE_ERROR',` and refactor the code from there. That's at least the approach we took to make it more manageable.

## Performance Logging (All) Routes

Let's keep build on the example we walked through above with the `src/app/api/v0/categories/route.ts` route. We're going to take a few quick steps to implement a performance monitor (observability) within this route.

```ts
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import Logger from '@/utils/logger'

export async function GET() {
  // 1. Start tracking time immediately
  const start = performance.now()

  const logger = new Logger({
    name: 'api.v0.categories.GET',
  })

  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, color')

  if (error) {
    void logger.logDatabaseError(error)

    return failResponse(error?.message)
  }

  // 2. Capture the time it took to complete the task
  const end = performance.now()

  // 3. Log the time to the `execution_time` field
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })
  return okResponse(data)
}
```

That's it. Note, we didn't log the performance in the edge case where a database error is thrown.

### Why Monitor Performance?

By logging the time it takes to complete a task, we observe, monitor and address bottlenecks within the application.

This isn't something that necessarily yield's immediate benefits, but it puts us in a position to catch strays. Imagine you're coworker says to you:

> "Hey, why look at this route `api.v0.categories.GET` taking a full minute or longer to resolve, it used to take 500 milliseconds. What's up with that?"

The benefit here, is the ability to know that this is happening at all. We're a step ahead of the users as well as have already honed in on the exact functional area of concern.

Imagine the alternative scenarios, where users are forced to endure, or have to submit bug reports to tell you you're application is slow. Or worse, when users revolt and take to [Reddit and Twitter to shit on your product](https://www.reddit.com/r/HeyEmail/comments/1bqg0av/hey_email_performance/).

These are the general reasons you'd want to implement performance monitoring. There's also the cool visual aspect in your application where you can observe what's happening.

**Where should I be monitoring performance?**

At the start and end of any and all business logic in your application.

## Tracking the Request and User

So by default, the logger actually isn't tracking the user or the request that was sent. That's because the logger doesn't explicitly have access to this information out of the box. Good news is, we've made it easy for you can opt into this functionality if you want.

This time, we'll use a route that requires user authentication. You'll notice a-lot of similarities in this route when compared to the previous route we've been looking at. The biggest difference is the conditional statement that checks for user authentication.

```ts
import { getCurrentUser } from '@/server/getCurrentUser'
import { failResponse, okResponse } from '@/utils/response'
import { supabase } from '@/utils/supabase'
import Logger from '@/utils/logger'

export async function GET() {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v1.trendy.history.GET',
  })
  const { data: userData, error: userError } = await getCurrentUser()
  if (userError || !userData) {
    void logger.logAuthError(userError)
    return failResponse('Trouble getting user')
  }

  const { data: trendyData, error: trendyError } = await supabase
    .from('chroniconl__trendy__url_history')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (trendyError) {
    void logger.logDatabaseError(trendyError)
    return failResponse("Couldn't fetch data")
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })
  return okResponse(trendyData, 'Success')
}
```

Again, this route is quite similar to the one we were looking at before. The difference being the logic that checks for the current user. We also are using a few additional error logger methods.

Take the following steps to configure the request and user.

```ts
// ...
// 1. Import the NextRequest type definition
import { NextRequest } from 'next/server'

// 2. Use the NextRequest type definition
//    you'll see type errors if this isn't defined
export async function GET(request: NextRequest) {
  const start = performance.now()
  const logger = new Logger({
    name: 'api.v1.trendy.history.GET',
    // 3. Pass the request object into the Logger
    //    This extracts the ip address, headers, cookies, and more
    request: request,
  })

  // OPTIONAL (Steps 4 and 5 are only needed to tie the user to the event)
  // 4. Extract the data object from the `getCurrentUser` response
  const { data: userData, error: userError } = await getCurrentUser()
  if (userError || !userData) {
    void logger.logAuthError(userError)
    return failResponse('Trouble getting user')
  }

  // 5. Set the userId and sessionId fields to the logger
  //    Events in this instance of the logger will be tied to the user
  logger.setUserId(userData?.id)
  logger.setSessionId(userData?.session_id)

  const { data: trendyData, error: trendyError } = await supabase
    .from('chroniconl__trendy__url_history')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (trendyError) {
    void logger.logDatabaseError(trendyError)
    return failResponse("Couldn't fetch data")
  }

  const end = performance.now()
  void logger.logPerformance({
    execution_time: Math.round(end - start),
  })
  return okResponse(trendyData, 'Success')
}
```

## Job Complete

That's all there is too it. To recap what we've accomplished:

1. Setup the logger, and configured it to report errors.
2. Implemented performance monitoring to observe time it takes to complete tasks.
3. Implemented additional security measures that track the origin of the request, and user that sent the request.
