We have a custom logger component that we use for general purpose logging across the server side of our application. It's super helper for debugging, security and performance monitoring.

## Usage

```js
import Logger from '@/utils/logger'

const logger = new Logger({
  loggerName: 'my-logger-name',
  applicationName: 'my-application-name',
  environment: (process.env.NODE_ENV as string) || 'development',
  httpMethod: 'PUT',
})

// Authentication Error Logger
export async function myLogger__AuthError(error: any) {
  void logger.logError({
    message: error, // automatically stringified
    error_code: 'AUTH_ERROR',
  })
}
```

## Technical Details

When defining a new logger, we give a `loggerName` e.g.

```js
const loggerName = 'api.v0.2.create-author.PUT'
```

This name has purpose, its a dot version the route we're looking at, plus the method. So the logger name above coverts to: `api/v0.2/create-author` specifically referring to a PUT request in that route. It's not always explicit, but the intention is to keep the logger tied as closely as possible to the code that is logging it.

The `applicationName` is used to determine which application the log originated from. For example, we have the primary app: Chroniconl, and the Trendy API. There's also CRON jobs that use the logger that would fall under a different application name.

Lastly the env is useful because most of the time you don't really want to mix testing data with production data.

Really this is like our camera in the room, its how we prevent ourselves from creating black box within our own application. It's a beast to setup but painless to maintain.

## Type Definitions

Once the logger is initialized, you can use it to log errors and performance data. The `logError` and `logPerformance` methods accept an object of type `LogData` as their only parameter. This object contains the following properties:

| **Property**      | **Type** | **Description**                                                                                                  |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `message`         | `string` | A descriptive message for the log.                                                                               |
| `error_code?`     | `string` | An optional error code, which could represent specific error types (e.g., `VALIDATION_ERROR`, `DATABASE_ERROR`). |
| `exception_type?` | `string` | An optional string specifying the type of exception (if applicable).                                             |
| `stack_trace?`    | `string` | An optional stack trace of the error, useful for debugging.                                                      |
| `execution_time?` | `number` | Optional. Represents the time taken for the execution, usually in milliseconds.                                  |
| `cpu_usage?`      | `number` | Optional. The percentage of CPU usage at the time of logging.                                                    |
| `memory_usage?`   | `number` | Optional. The amount of memory used at the time of logging, typically in bytes.                                  |
| `response_time?`  | `number` | Optional. The time taken for a response, usually in milliseconds.                                                |
| `user_id?`        | `string` | Optional. The ID of the user associated with the log, if applicable.                                             |
| `session_id?`     | `string` | Optional. The ID of the session associated with the log.                                                         |
| `request_id?`     | `string` | Optional. The ID of the request associated with the log.                                                         |
| `ip_address?`     | `string` | Optional. The IP address from which the request originated.                                                      |
| `url?`            | `string` | Optional. The URL related to the log event.                                                                      |
| `http_method?`    | `string` | Optional. The HTTP method (e.g., `GET`, `POST`) associated with the log.                                         |
| `service_name?`   | `string` | Optional. The name of the service where the log originated.                                                      |
| `hostname?`       | `string` | Optional. The hostname of the server where the log originated.                                                   |
| `thread_id?`      | `string` | Optional. The thread ID on which the operation was performed.                                                    |
| `correlation_id?` | `string` | Optional. An ID used to correlate logs across different services.                                                |
| `custom_field_1?` | `string` | Optional. A custom field for additional context or metadata.                                                     |
| `custom_field_2?` | `string` | Optional. A second custom field for additional context or metadata.                                              |
| `log_level`       | `string` | The level of the log, e.g., `ERROR`, `PERFORMANCE`. This is used to categorize the log entry.                    |
