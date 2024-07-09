'use client'
import { useForm } from 'react-hook-form'
import { Button } from '@chroniconl/ui/button'
import { Input } from '@chroniconl/ui/input'
import { Label } from '@chroniconl/ui/label'
import { Textarea } from '@chroniconl/ui/textarea'
import { toast } from '@chroniconl/ui/use-toast'
import { useRouter } from 'next/navigation'

interface ContactFormProps {
  name: string
  email: string
  phone: string
  message: string
}

export default function ContactForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormProps>()

  const onSubmit = async (data: ContactFormProps) => {
    const response = await fetch('/api/v0.1/contact-form', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    const { error } = await response.json()
    if (error) {
      toast({
        title: 'Error',
        description: 'Message failed to send. Please try again later.',
        variant: 'destructive',
      })
      return
    }

    router.push('/thank-you?newsletter=true')
  }

  return (
    <section className="mx-auto w-full max-w-2xl py-12 md:py-16">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold">Get in Touch</h2>
        <p className="text-stone-500 dark:text-stone-400">
          Have a project in mind? Fill out the form and I'll get back to you as
          soon as possible.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Your email"
              type="email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="Your phone number"
            {...register('phone', { required: 'Phone is required' })}
          />
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            className="min-h-[120px]"
            id="message"
            placeholder="Tell me about your project"
            {...register('message', { required: 'Message is required' })}
          />
          {errors.message && <span>{errors.message.message}</span>}
        </div>
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </section>
  )
}
