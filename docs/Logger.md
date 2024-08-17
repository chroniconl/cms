# Logger

We have a custom logger component that we use for general purpose logging across the server side of our application. It's super helper for debugging, security and performance monitoring. The data we collect in this logger is available via https://chroniconl.com/dashboard/log-manager

## About the logger

[@matthewbub](https://github.com/matthewbub) prides himself on the ability to securely trace the actions that users are taking within our application. If there is a point in which our application could potentially break on the server, we have (or, should have) a error logger there.

If you take a look at the versioned-routes within the api directory, you'll see a-lot of logging going on. Typically, right before a return statement. The logging statements are generally going to be denoted with the `void` flag to let our `async` logic continue without needing to `await` a response from the logger.

## Usage

We're going to focus on covering scenarios we've already encountered and attempt to replicate similar patterns until we're completely language agnostic. (E.g for Node, Python, Golang)

### Tutorials

- [Logging with the Next.js App Router](./Logger-Nextjs-AppRouter-Tutorial.md)

## Technical Details

When defining a new logger, we give a `loggerName` e.g.

```js
const loggerName = 'api.v0.2.create-author.PUT'
```

This name has purpose, its a dot version the route we're looking at, plus the method. So the logger name above coverts to: `api/v0.2/create-author` specifically referring to a PUT request in that route. It's not always explicit, but the intention is to keep the logger tied as closely as possible to the code that is logging it.

The `applicationName` is used to determine which application the log originated from. For example, we have the primary app: Chroniconl, and the Trendy API. There's also CRON jobs that use the logger that would fall under a different application name.

Lastly the env is useful because most of the time you don't really want to mix testing data with production data.

Really this is like our camera in the room, its how we prevent ourselves from creating black box within our own application.

## Type Definitions

The `LogData` type is used as a parameter for the logging methods. Below is the definition and explanation of its properties:

| **Property**      | **Type** | **Description**                                                                                         |
| ----------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `message`         | `string` | A descriptive message for the log.                                                                      |
| `log_level`       | `string` | The level of the log, e.g., `ERROR`, `PERFORMANCE`. This is used to categorize the log entry.           |
| `error_code?`     | `string` | An error code, which could represent specific error types (e.g., `VALIDATION_ERROR`, `DATABASE_ERROR`). |
| `exception_type?` | `string` | An string specifying the type of exception (if applicable).                                             |
| `stack_trace?`    | `string` | An stack trace of the error, useful for debugging.                                                      |
| `execution_time?` | `number` | Represents the time taken for the execution, usually in milliseconds.                                   |
| `cpu_usage?`      | `number` | The percentage of CPU usage at the time of logging.                                                     |
| `memory_usage?`   | `number` | The amount of memory used at the time of logging, typically in bytes.                                   |
| `response_time?`  | `number` | The time taken for a response, usually in milliseconds.                                                 |
| `user_id?`        | `string` | The ID of the user associated with the log, if applicable.                                              |
| `session_id?`     | `string` | The ID of the session associated with the log.                                                          |
| `request_id?`     | `string` | The ID of the request associated with the log.                                                          |
| `ip_address?`     | `string` | The IP address from which the request originated.                                                       |
| `url?`            | `string` | The URL related to the log event.                                                                       |
| `http_method?`    | `string` | The HTTP method (e.g., `GET`, `POST`) associated with the log.                                          |
| `service_name?`   | `string` | The name of the service where the log originated.                                                       |
| `hostname?`       | `string` | The hostname of the server where the log originated.                                                    |
| `thread_id?`      | `string` | The thread ID on which the operation was performed.                                                     |
| `correlation_id?` | `string` | An ID used to correlate logs across different services.                                                 |
| `custom_field_1?` | `string` | A custom field for additional context or metadata.                                                      |
| `custom_field_2?` | `string` | A second custom field for additional context or metadata.                                               |

## Logger Methods

- `logError`: Logs an error with a specified LogData object. This method automatically sets the log_level to 'ERROR'.
- `logPerformance`: Logs performance data with a specified LogData object. This method automatically sets the log_level to 'PERFORMANCE'.
- `logInfo`: Logs informational data with a specified LogData object. This method automatically sets the log_level to 'INFO'.
- `logChatGpt`: Logs data specific to interactions with ChatGPT, setting the log_level to 'CHATGPT'.

## Error-Specific Loggers

The following methods are tailored to log specific types of errors:

- `logDatabaseError`: Logs an error with the error_code set to 'DATABASE_ERROR'.
- `logAuthError`: Logs an error with the error_code set to 'AUTH_ERROR'.
- `logValidationError`: Logs an error with the error_code set to 'VALIDATION_ERROR'.
- `logGeneralError`: Logs a general error with the error_code set to 'GENERAL_ERROR'.
- `logUploadThingError`: Logs an error related to media fetching with the error_code set to 'UPLOADTHING_MEDIA_FETCH_ERROR'.

These methods help in categorizing and managing different error types consistently.
