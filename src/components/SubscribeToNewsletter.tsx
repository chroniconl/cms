'use client'
import { useForm, Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ChButtonSecondaryMarketing } from '@/components/ui/button'
import { MailIcon } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useState } from 'react'
import Confetti from './Confetti'

export default function SubscribeToNewsletter() {
  const [trigger, setTrigger] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{
    email: string
  }>()

  const onSubmit = async (data: { email: string }) => {
    // Handle form submission, e.g., send data to your server
    const response = await fetch('/api/v0.1/subscribe-to-newsletter', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    const { error, message } = await response.json()
    if (error) {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
      return
    }

    reset()
    toast({
      title: 'Success',
      description: 'You have successfully subscribed to our newsletter.',
    })
    setTrigger(true)
    setTimeout(() => {
      setTrigger(false)
    }, 2000)
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="ch-border p-4">
        <div className="mb-2 flex w-fit items-center rounded-sm border border-stone-700 p-2 outline outline-stone-900">
          <MailIcon className="h-4 w-4" />
        </div>
        <h2 className="ch-body">Subscribe to our Newsletter</h2>
        <p className="ch-body ch-muted">
          Stay up-to-date with the stuff we do. We won't spam ya.
        </p>
      </div>
      <div className="relative">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div>
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="rounded-none"
                />
              )}
            />
            {/* i don't think this will ever be hit but it makes me feel better */}
            {errors.email && <span>This field is required</span>}
          </div>
          <div className="flex w-full justify-end">
            <ChButtonSecondaryMarketing type="submit" className="w-full">
              Subscribe
            </ChButtonSecondaryMarketing>
          </div>
        </form>

        <Confetti trigger={trigger} />
      </div>
    </div>
  )
}
