'use client'

import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { EyeIcon, InfoIcon } from 'lucide-react'
import Message from './Message'

interface MessageProps {
  id: number
  email: string
  name: string
  message: string
  phone: string
  status: string
  date: string
}

interface MessagesProps {
  messages: MessageProps[]
}

export default function Messages({ messages }: MessagesProps) {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedMessage, setSelectedMessage] = useState<MessageProps | null>(
    null,
  )

  const handleShowModal = (message: MessageProps | null) => {
    setSelectedMessage(message)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedMessage(null)
  }

  const [messageList, setMessageList] = useState<MessageProps[]>(messages)

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<keyof MessageProps>('email')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (column: keyof MessageProps) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  // const handleMarkSeen = (id: number) => {
  // 	setMessageList(messageList.map((message) => (message.id === id ? { ...message, status: "seen" } : message)))
  // }

  const filteredMessages = messageList.filter((message) =>
    Object.values(message).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  )

  const sortedMessages = filteredMessages.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Form Submissions Messages</CardTitle>
          <CardDescription>
            View and manage all contact us messages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  onClick={() => handleSort('email')}
                  className="cursor-pointer"
                >
                  Email
                  {sortColumn === 'email' && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? '\u25B2' : '\u25BC'}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  onClick={() => handleSort('name')}
                  className="cursor-pointer"
                >
                  Name
                  {sortColumn === 'name' && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? '\u25B2' : '\u25BC'}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  onClick={() => handleSort('message')}
                  className="cursor-pointer"
                >
                  Message
                  {sortColumn === 'message' && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? '\u25B2' : '\u25BC'}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  onClick={() => handleSort('phone')}
                  className="cursor-pointer"
                >
                  Phone
                  {sortColumn === 'phone' && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? '\u25B2' : '\u25BC'}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  onClick={() => handleSort('status')}
                  className="cursor-pointer"
                >
                  Status
                  {sortColumn === 'status' && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? '\u25B2' : '\u25BC'}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  onClick={() => handleSort('date')}
                  className="cursor-pointer"
                >
                  Date
                  {sortColumn === 'date' && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? '\u25B2' : '\u25BC'}
                    </span>
                  )}
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.message}</TableCell>
                  <TableCell>{message.phone}</TableCell>
                  <TableCell>
                    <Badge size={''}>{message.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(message.date).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleShowModal(message)}
                    >
                      <InfoIcon className="h-5 w-5" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={showModal} onOpenChange={handleCloseModal}>
        <DialogContent>
          {selectedMessage && (
            <div>
              <Message
                email={selectedMessage.email}
                name={selectedMessage.name}
                message={selectedMessage.message}
                phone={selectedMessage.phone}
                date={selectedMessage.date}
                id={selectedMessage.id}
                status={selectedMessage.status}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
