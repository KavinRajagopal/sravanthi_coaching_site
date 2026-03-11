"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  role: z.string().optional(),
  helpNeeded: z.string().min(10, "Please tell us a bit more"),
  goals: z.string().optional(),
  consent: z.boolean().refine((v) => v, "Please confirm your consent"),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setSubmitted(true)
    } catch {
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="border border-brand-gold bg-brand-elevated p-8 text-center">
        <CheckCircle className="text-brand-gold mx-auto mb-4" size={40} />
        <h3 className="font-display text-2xl text-brand-text font-light mb-2">Thank you!</h3>
        <p className="text-brand-muted">Your message has been received. Sravanthi will be in touch within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label className="text-brand-muted text-xs tracking-widest uppercase mb-2 block">Full Name *</Label>
        <Input {...register("name")} className="bg-white border-brand-border text-brand-text rounded-none focus-visible:ring-brand-gold" placeholder="Your name" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label className="text-brand-muted text-xs tracking-widest uppercase mb-2 block">Email *</Label>
        <Input {...register("email")} type="email" className="bg-white border-brand-border text-brand-text rounded-none focus-visible:ring-brand-gold" placeholder="your@email.com" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Label className="text-brand-muted text-xs tracking-widest uppercase mb-2 block">Company / Role</Label>
        <Input {...register("role")} className="bg-white border-brand-border text-brand-text rounded-none focus-visible:ring-brand-gold" placeholder="e.g. Director of Marketing, Founder" />
      </div>

      <div>
        <Label className="text-brand-muted text-xs tracking-widest uppercase mb-2 block">What help do you need? *</Label>
        <Textarea {...register("helpNeeded")} className="bg-white border-brand-border text-brand-text rounded-none focus-visible:ring-brand-gold min-h-24" placeholder="Tell me about your speaking goals and challenges..." />
        {errors.helpNeeded && <p className="text-red-500 text-xs mt-1">{errors.helpNeeded.message}</p>}
      </div>

      <div className="flex items-start gap-3">
        <input type="checkbox" {...register("consent")} id="consent" className="mt-1 accent-brand-gold" />
        <Label htmlFor="consent" className="text-brand-muted text-sm leading-relaxed cursor-pointer">
          I agree to be contacted by Sravanthi about coaching opportunities. I understand my data will be handled in accordance with the <Link href="/privacy-policy" className="text-brand-gold hover:underline">Privacy Policy</Link>.
        </Label>
      </div>
      {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-gold hover:bg-brand-gold-light text-white py-5 text-sm tracking-widest uppercase rounded-none transition-all duration-300"
      >
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
