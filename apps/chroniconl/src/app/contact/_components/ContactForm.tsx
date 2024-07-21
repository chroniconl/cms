'use client'
import { useForm } from 'react-hook-form'
import { ChButtonPrimaryMarketing } from '@repo/ui/button'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { Textarea } from '@repo/ui/textarea'
import { toast } from '@repo/ui/use-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
      <div className="text-center">
        <h2 className="ch-heading ch-primary">Get in Touch</h2>
        <p className="ch-body ch-muted">
          Have a project in mind? Fill out the form and I'll get back to you as
          soon as possible.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div>
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
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="Your phone number"
            {...register('phone', { required: 'Phone is required' })}
          />
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            className="min-h-[120px]"
            id="message"
            placeholder="Tell me about your project"
            {...register('message', { required: 'Message is required' })}
          />
          {errors.message && <span>{errors.message.message}</span>}
        </div>
        <div className="flex justify-end gap-2">
          <ChButtonPrimaryMarketing type="submit">
            Get in Touch
          </ChButtonPrimaryMarketing>
        </div>
      </form>
    </section>
  )
}
