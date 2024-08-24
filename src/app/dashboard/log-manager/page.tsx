'use client'
import React, { useEffect, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Code } from '@/components/text'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Clock, Cpu, Server } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChButtonSecondary } from '@/components/ui/button'
import { Text } from '@/components/text'
import { constants } from '@/messages/constants'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

type LogEntry = {
  timestamp: string
  message: string
  error_code?: string
  exception_type?: string
  stack_trace?: string
  execution_time?: number
  cpu_usage?: number
  memory_usage?: number
  response_time?: number
  user_id?: string
  session_id?: string
  request_id?: string
  ip_address?: string
  url?: string
  http_method?: string
  service_name?: string
  hostname?: string
  thread_id?: string
  correlation_id?: string
  custom_field_1?: string
  custom_field_2?: string
  log_level: string
  logger_name: string
  application_name: string
  environment: string
}

const columnHelper = createColumnHelper<LogEntry>()

const defaultValue = (info: any) => {
  const gV = info.getValue()

  if (!gV) {
    return <span className="text-green-500">-</span>
  }
  return gV
}

const columns = [
  columnHelper.accessor('timestamp', {
    header: 'Timestamp',
    cell: defaultValue,
  }),
  columnHelper.accessor('message', {
    header: 'Message',
    cell: (info) => {
      const message = info.getValue()
      const sliceAt = 30

      const rowData = info.row.getAllCells()

      const loggerName = rowData.find(
        (cell) => cell.column.id === 'logger_name',
      )
      const applicationName = rowData.find(
        (cell) => cell.column.id === 'application_name',
      )
      const environment = rowData.find(
        (cell) => cell.column.id === 'environment',
      )
      const timestamp = rowData.find((cell) => cell.column.id === 'timestamp')
      const errorCode = rowData.find((cell) => cell.column.id === 'error_code')
      if (message.length <= sliceAt) {
        return `${message}`
      }

      const getMessage = () => {
        try {
          return JSON.stringify(JSON.parse(message), null, 2)
        } catch (error) {
          return message
        }
      }
      return (
        <span>
          {message.slice(0, sliceAt) || '-'}
          <Sheet>
            <SheetTrigger>
              <span className="cursor-pointer text-green-400 hover:text-green-600 hover:underline">
                [...{message.length - sliceAt}]
              </span>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle>Log Details</SheetTitle>
              <SheetDescription>
                Detailed information about the selected log entry.
              </SheetDescription>
              <div className="mt-6 space-y-6">
                {(errorCode?.getValue() as string) && (
                  <Badge variant="destructive">
                    {(errorCode?.getValue() as string) || ''}
                  </Badge>
                )}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">
                    {(applicationName?.getValue() as string) || ''}
                  </Badge>
                  <Badge variant="outline">
                    {(environment?.getValue() as string) || ''}
                  </Badge>
                  <Badge variant="outline">
                    {(loggerName?.getValue() as string) || ''}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Timestamp</h3>
                  <p className="mt-1 text-sm">
                    {new Date(
                      (timestamp?.getValue() as string) || '',
                    ).toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Message</h3>
                  <ScrollArea className="ch-border mt-1 h-[300px] rounded-md p-2">
                    <pre className="whitespace-pre-wrap break-words text-xs text-stone-200">
                      <code>{getMessage()}</code>
                    </pre>
                  </ScrollArea>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </span>
      )
    },
  }),
  columnHelper.accessor('error_code', {
    header: 'Error Code',
    cell: defaultValue,
  }),
  columnHelper.accessor('log_level', {
    header: 'Log Level',
    cell: defaultValue,
  }),
  columnHelper.accessor('exception_type', {
    header: 'Exception Type',
    cell: defaultValue,
  }),
  columnHelper.accessor('stack_trace', {
    header: 'Stack Trace',
    cell: defaultValue,
  }),
  columnHelper.accessor('execution_time', {
    header: 'Execution Time',
    cell: defaultValue,
  }),
  columnHelper.accessor('http_method', {
    header: 'HTTP Method',
    cell: defaultValue,
  }),
  columnHelper.accessor('logger_name', {
    header: 'Logger Name',
    cell: defaultValue,
  }),
  columnHelper.accessor('application_name', {
    header: 'Application Name',
    cell: defaultValue,
  }),
  columnHelper.accessor('environment', {
    header: 'Environment',
    cell: defaultValue,
  }),
  columnHelper.accessor('service_name', {
    header: 'Service Name',
    cell: defaultValue,
  }),
  columnHelper.accessor('hostname', { header: 'Hostname', cell: defaultValue }),
  columnHelper.accessor('cpu_usage', {
    header: 'CPU Usage',
    cell: defaultValue,
  }),
  columnHelper.accessor('memory_usage', {
    header: 'Memory Usage',
    cell: defaultValue,
  }),
  columnHelper.accessor('response_time', {
    header: 'Response Time',
    cell: defaultValue,
  }),
  columnHelper.accessor('user_id', { header: 'User ID', cell: defaultValue }),
  columnHelper.accessor('session_id', {
    header: 'Session ID',
    cell: defaultValue,
  }),
  columnHelper.accessor('request_id', {
    header: 'Request ID',
    cell: defaultValue,
  }),
  columnHelper.accessor('ip_address', {
    header: 'IP Address',
    cell: defaultValue,
  }),
  columnHelper.accessor('url', {
    header: 'URL',
    cell: (info) => {
      const url = info.getValue()
      if (!url) {
        return <span className="text-green-500">-</span>
      }
      return <Code>{url}</Code>
    },
  }),
  columnHelper.accessor('thread_id', {
    header: 'Thread ID',
    cell: defaultValue,
  }),
  columnHelper.accessor('correlation_id', {
    header: 'Correlation ID',
    cell: defaultValue,
  }),
  columnHelper.accessor('custom_field_1', {
    header: 'Custom Field 1',
    cell: defaultValue,
  }),
  columnHelper.accessor('custom_field_2', {
    header: 'Custom Field 2',
    cell: defaultValue,
  }),
]

const DEFAULT_PAGE_SIZE = 50
export default function LogManager() {
  const [data, setData] = useState<LogEntry[]>([])
  const [count, setCount] = useState<number>(0)
  const [intervals, setIntervals] = useState<Record<string, string>>({})

  // Pagination state
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [totalPages, setTotalPages] = useState(1)

  // Filter state
  const [loggerName, setLoggerName] = useState<string>('')
  const [applicationName, setApplicationName] = useState<string>('')
  const [environment, setEnvironment] = useState<string>('')
  const [errorCode, setErrorCode] = useState<string>('')
  const [logLevel, setLogLevel] = useState<string>('')

  // loading state
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchLogs = async () => {
      const potentialValues = {
        page: page.toString(),
        pageSize: pageSize.toString(),
        loggerName: loggerName,
        applicationName: applicationName,
        environment: environment,
        errorCode: errorCode,
        logLevel: logLevel,
      }

      const values = Object.fromEntries(
        Object.entries(potentialValues).filter(([, value]) => value !== ''),
      )
      const urlParams = new URLSearchParams({
        ...values,
      })

      setLoading(true)

      const response = await fetch(
        '/api/v1/log-manager/history' + `?${urlParams.toString()}`,
      )
      const { data, error } = await response.json()
      if (error) {
        throw new Error('Failed to fetch logs')
        setLoading(false)
      }
      setData(data?.logs)
      setCount(data?.count)
      setTotalPages(Math.ceil(data?.count / pageSize))
      setLoading(false)
    }
    fetchLogs()
  }, [
    page,
    pageSize,
    loggerName,
    applicationName,
    environment,
    errorCode,
    logLevel,
  ])

  useEffect(() => {
    const fetchIntervals = async () => {
      const response = await fetch('/api/v1/log-manager/stats')
      const { data, error } = await response.json()
      if (error) {
        throw new Error('Failed to fetch intervals')
      }
      console.log(data)
      setIntervals(data)
    }
    fetchIntervals()
  }, [])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
  })

  return (
    <>
      {!data ||
        (loading && (
          <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50">
            <div className="flex h-full w-full items-center justify-center">
              <div className="animate-ping rounded-full bg-teal-600 p-4">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        ))}
      <div className="container mx-auto p-4">
        <div className="mb-4 mt-2 flex items-center space-x-2">
          <Switch
            id="environment-switch"
            defaultChecked={environment === 'production'}
            onCheckedChange={(value) =>
              setEnvironment(value ? 'production' : 'development')
            }
          />
          <Label htmlFor="log-type">
            {environment === 'production'
              ? 'Production logs'
              : 'Development logs'}
          </Label>
        </div>
        <div
          id="log-manager-stats"
          className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Total Logs
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last hour
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Avg. Response Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">250ms</div>
              <p className="text-xs text-muted-foreground">
                -5% from last hour
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                CPU Usage
              </CardTitle>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45%</div>
              <p className="text-xs text-muted-foreground">
                +7% from last hour
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Active Services
              </CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                No change from last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div
          id="log-manager-filters"
          className="mb-4 mt-12 grid grid-cols-4 gap-4"
        >
          <div className="space-y-2">
            <label htmlFor="filter-logger-name" className="sr-only">
              Logger Name
            </label>
            <Select>
              <SelectTrigger id="filer-logger-name">
                <SelectValue placeholder="Filter logger name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="404">404</SelectItem>
                <SelectItem value="500">500</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="filter-error-code" className="sr-only">
              Error Code
            </label>
            <Select
              value={errorCode}
              onValueChange={(value) => setErrorCode(value)}
            >
              <SelectTrigger id="filter-error-code">
                <SelectValue placeholder="Filter error code" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">-</SelectItem>
                {Object.keys(constants.ERROR_MESSAGES).map((errorMessage) => (
                  <SelectItem key={errorMessage} value={errorMessage}>
                    {errorMessage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="filter-log-level" className="sr-only">
              Log Level
            </label>
            <Select
              value={logLevel}
              onValueChange={(value) => setLogLevel(value)}
            >
              <SelectTrigger id="filter-log-level">
                <SelectValue placeholder="Filter log level" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(constants.LOG_LEVELS).map((logLevel) => (
                  <SelectItem key={logLevel} value={logLevel}>
                    {logLevel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div id="log-manager-table" className="ch-border rounded-md">
          <Table>
            <TableHeader className="bg-card">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4}>No logs found</TableCell>
                </TableRow>
              )}
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="whitespace-nowrap"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="whitespace-nowrap text-xs"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="ch-border-top flex items-center justify-between bg-card px-4 pb-4 pt-4">
            <ChButtonSecondary
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </ChButtonSecondary>
            <div className="flex items-center justify-between space-x-2">
              <Text>
                {totalPages === 0
                  ? 'No pages available'
                  : `Page ${page} of ${totalPages}`}
              </Text>
              <div className="space-x-2">
                <label htmlFor="filter-rows-per-page" className="sr-only">
                  Rows per page
                </label>
                <Select
                  name="filter-rows-per-page p-0 mt-0"
                  value={pageSize.toString()}
                  onValueChange={(value) => setPageSize(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Rows per page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 rows</SelectItem>
                    <SelectItem value="25">25 rows</SelectItem>
                    <SelectItem value="50">50 rows</SelectItem>
                    <SelectItem value="100">100 rows</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <ChButtonSecondary
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages || totalPages === 0}
            >
              Next
            </ChButtonSecondary>
          </div>
        </div>
      </div>
    </>
  )
}
