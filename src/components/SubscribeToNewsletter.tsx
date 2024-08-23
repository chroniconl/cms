'use client'
import { useForm, Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ChButtonPrimary, ChButtonSecondary } from '@/components/ui/button'
import { MailIcon } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useState } from 'react'
import Confetti from './Confetti'
import BorderBottom from './BorderBottom'
import Link from 'next/Link'

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
    <div>
      <div className="ch-border-outline mt-32 w-full rounded-lg bg-card p-6 md:p-12">
        <div className="flex max-w-xl flex-col gap-4">
          <div className="">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
              Subscribe to the Newsletter
            </h2>
            <p className="mb-8">
              If you want to receive bi-monthly updates on this project and
              more, enter your email below.
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
                    <>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="mb-2 rounded-none border-none bg-transparent text-base"
                      />
                      <BorderBottom borderColor="#FFFFFF" height={4} />
                    </>
                  )}
                />
                {/* i don't think this will ever be hit but it makes me feel better */}
                {errors.email && <span>This field is required</span>}
              </div>
              <p className="text-sm italic">You may unsubscribe at any time</p>
              <div className="flex w-full justify-end">
                <ChButtonPrimary type="submit" className="w-fit text-base">
                  Subscribe
                </ChButtonPrimary>
              </div>
            </form>
          </div>
        </div>
      </div>
      <p className="ch-text mt-2">
        Alternatively,{' '}
        <Link href="/feed.xml" className="text-teal-600 underline">
          add Chroniconl
        </Link>{' '}
        to your RSS feed
      </p>
      <Confetti trigger={trigger} />
    </div>
  )
}
