'use client'

import { Label } from '@repo/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/select'
import { DatePickerSimple } from '@/components/DatePicker'
import { Button, ChButtonPrimary } from '@repo/ui/button'
import { Heading } from '@/components/heading'
import { Card } from '@repo/ui/card'
import { useForm, Controller } from 'react-hook-form'
import { toast } from '@repo/ui/use-toast'
import { convertTimeString } from '@/utils/dates'

export interface PublishDetailsProps {
  id: string
  visibility?: string
  publishDateDay?: Date | null
  publishDateTime?: string | null
}

export interface PublishDetailsFormProps {
  id: string
  visibility?: string
  publishDateDay?: Date
  publishDateTime?: string
}

export default function PublishDetailsForm({
  id,
  visibility,
  publishDateDay = null,
  publishDateTime = null,
}: PublishDetailsProps) {
  const { control, handleSubmit } = useForm<PublishDetailsFormProps>({
    defaultValues: {
      visibility: visibility || 'public',
      publishDateDay: publishDateDay ? new Date(publishDateDay) : new Date(),
      publishDateTime: publishDateTime
        ? convertTimeString(publishDateTime)
        : '9:00 AM',
    },
  })

  const onSubmit = async (data: PublishDetailsFormProps) => {
    const response = await fetch('/api/v0.1/document/publish-details', {
      method: 'PUT',
      body: JSON.stringify({
        ...data,
        id,
      }),
    })

    const { error } = await response.json()
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update publishing details',
        variant: 'destructive',
      })
      return
    }

    toast({
      title: 'Success',
      description: 'Publishing details updated successfully',
    })
  }
  return (
    <Card className="flex flex-col gap-4">
      <div className="px-4 pb-2 pt-6">
        <Heading level={3}>{'Publishing Details'}</Heading>
      </div>
      <form
        className="space-y-10 rounded-md px-4 pb-6"
        role="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <Label htmlFor="publish_date">Publish Date</Label>
            <div className="flex w-full">
              <Controller
                name="publishDateDay"
                control={control}
                render={({ field }) => (
                  <DatePickerSimple
                    date={field.value}
                    setDate={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="col-span-4">
            <Label htmlFor="publish_date">Time</Label>
            <div className="flex w-full gap-2">
              <Controller
                name="publishDateTime"
                control={control}
                render={({ field }) => (
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="flex w-full items-center justify-between">
                      <SelectValue placeholder="6:00 AM" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        '4:00 AM',
                        '5:00 AM',
                        '6:00 AM',
                        '7:00 AM',
                        '8:00 AM',
                        '9:00 AM',
                        '10:00 AM',
                        '11:00 AM',
                        '12:00 PM',
                        '1:00 PM',
                        '2:00 PM',
                        '3:00 PM',
                      ].map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <Label htmlFor="publish_date">Post Visibility</Label>
          <div className="flex w-full gap-2">
            <Controller
              name="visibility"
              control={control}
              render={({ field }) => (
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">{'Public'}</SelectItem>
                    <SelectItem value="private">{'Private'}</SelectItem>
                    <SelectItem value="draft">{'Draft'}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <ChButtonPrimary type="submit">
            Update Publishing Details
          </ChButtonPrimary>
        </div>
      </form>
    </Card>
  )
}
