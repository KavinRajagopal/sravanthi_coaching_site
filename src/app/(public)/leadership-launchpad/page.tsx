import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, Users, Mic, Target, Star, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"
import { CTASection } from "@/components/public/sections/CTASection"

export const metadata: Metadata = {
  title: "Leadership Launchpad — Public Speaking & Confidence Coaching | Emcee Sravz",
  description:
    "Private & group public speaking and confidence coaching. Build leadership, communication, and stage presence with Sravz — a professional emcee who has hosted 100+ live events.",
}

const privatePackages = [
  {
    name: "Starter Launchpad",
    stars: 1,
    sessions: "4 Private Sessions (1 Hour Each)",
    price: "$599",
    description:
      "Focus: Basics of public speaking, posture, voice, and confidence.",
  },
  {
    name: "Growth Launchpad",
    stars: 2,
    sessions: "6 Private Sessions (1 Hour Each)",
    price: "$799",
    highlighted: true,
    description:
      "Includes storytelling, impromptu speaking, audience engagement, and intro to hosting.",
  },
  {
    name: "Leadership Launchpad",
    stars: 3,
    sessions: "8 Private Sessions (1 Hour Each)",
    price: "$999",
    badge: "Full Program",
    description:
      "Includes advanced communication, leadership skills, hosting practice, and final mock event.",
  },
]

const skills = [
  "Speak confidently in front of groups",
  "Maintain strong eye contact and body language",
  "Project their voice clearly",
  "Think and respond quickly",
  "Tell engaging stories",
  "Connect with and engage an audience",
  "Communicate like a leader",
]

const showcaseItems = [
  "Welcome speech",
  "Introducing speakers or performers",
  "Audience interaction",
  "Closing remarks",
]

const whyItems = [
  {
    icon: <Users size={24} />,
    title: "Private coaching",
    description: "Focused one-on-one attention",
  },
  {
    icon: <Mic size={24} />,
    title: "Led by a professional emcee",
    description: "Real experience with live audiences",
  },
  {
    icon: <Target size={24} />,
    title: "Practical skills",
    description: "Public speaking, hosting, and leadership",
  },
  {
    icon: <Star size={24} />,
    title: "Life-long benefits",
    description: "Confidence that translates to school, interviews, and leadership roles",
  },
]

export default function LeadershipLaunchpadPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-bg pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">
              With Sravz
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-brand-text leading-[1.1] mb-4">
              Leadership Launchpad
            </h1>
            <p className="text-brand-gold text-lg md:text-xl tracking-wide">
              Private & Group Public Speaking & Confidence Coaching
            </p>
            <div className="mt-6 mx-auto w-12 h-px bg-brand-gold" />
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="mt-10 max-w-3xl mx-auto">
            <p className="text-brand-muted text-lg leading-relaxed">
              Leadership Launchpad is a private one-on-one coaching program designed to help individuals build confidence, communicate clearly, and develop leadership through public speaking and emceeing skills.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25} className="mt-8 max-w-2xl mx-auto">
            <p className="text-brand-muted text-sm mb-4 font-medium uppercase tracking-widest">
              Participants learn real-world communication skills used in:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Work/School presentations", "Leadership roles", "Debates and competitions", "Interviews", "Event hosting"].map((skill) => (
                <span
                  key={skill}
                  className="border border-brand-border text-brand-muted text-sm px-4 py-2 hover:border-brand-gold/40 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.35} className="mt-10 max-w-3xl mx-auto">
            <p className="text-brand-muted leading-relaxed">
              Sessions are tailored personally to each participant. Participants train with Sravz, a professional emcee and radio host who has hosted 100+ live events with audiences of thousands.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="mt-10">
            <Button
              asChild
              className="bg-brand-gold text-white hover:bg-brand-gold-light px-8 py-5 text-sm tracking-widest uppercase rounded-none"
            >
              <Link href="/book-call">
                Get Started <ArrowRight size={14} className="ml-2" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Private Coaching Packages */}
      <section className="bg-brand-elevated py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">Packages</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-brand-text leading-[1.1]">
              Private Coaching Packages
            </h2>
            <div className="mt-6 mx-auto w-12 h-px bg-brand-gold" />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {privatePackages.map((pkg, i) => (
              <ScrollReveal key={pkg.name} delay={i * 0.1}>
                <div
                  className={`relative flex flex-col h-full transition-all duration-300 ${
                    pkg.highlighted
                      ? "border-2 border-brand-gold bg-white shadow-lg scale-[1.02]"
                      : "border border-brand-border bg-white hover:border-brand-gold/40"
                  }`}
                >
                  {pkg.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-brand-gold text-white text-xs font-sans tracking-widest uppercase px-4 py-1.5">
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  <div className="p-8 flex flex-col h-full">
                    <div className="flex justify-center gap-1 mb-3">
                      {Array.from({ length: pkg.stars }).map((_, j) => (
                        <Star key={j} size={16} className="text-brand-gold fill-brand-gold" />
                      ))}
                    </div>

                    <h3
                      className={`font-display text-2xl md:text-3xl font-light text-center mb-2 ${
                        pkg.highlighted ? "text-brand-gold" : "text-brand-text"
                      }`}
                    >
                      {pkg.name}
                    </h3>

                    <p className="text-center text-brand-muted text-sm mb-2">{pkg.sessions}</p>

                    <p className="text-center font-display text-3xl text-brand-text mb-4">{pkg.price}</p>

                    <div className="w-8 h-px bg-brand-border mx-auto mb-6" />

                    <p className="text-brand-muted text-sm leading-relaxed text-center flex-1">{pkg.description}</p>

                    <Button
                      asChild
                      className={`w-full py-5 mt-8 text-sm tracking-widest uppercase rounded-none transition-all duration-300 ${
                        pkg.highlighted
                          ? "bg-brand-gold text-white hover:bg-brand-gold-light"
                          : "bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white"
                      }`}
                    >
                      <Link href="/book-call">Book Now</Link>
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing Coaching */}
      <section className="bg-brand-bg py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">Ongoing</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-brand-text leading-[1.1]">
              Ongoing Private Coaching
            </h2>
            <div className="mt-6 mx-auto w-12 h-px bg-brand-gold" />
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="mt-10">
            <div className="border border-brand-gold bg-white p-10">
              <p className="text-brand-muted text-sm mb-2">4 private sessions per month (1 Hour Each)</p>
              <p className="font-display text-4xl text-brand-text mb-2">$396<span className="text-lg text-brand-muted">/month</span></p>
              <p className="text-brand-muted text-xs tracking-widest uppercase mb-6">(12-month program)</p>
              <div className="w-8 h-px bg-brand-border mx-auto mb-6" />
              <p className="text-brand-muted text-sm leading-relaxed max-w-xl mx-auto">
                Focus: Leadership communication, advanced public speaking, storytelling, and real-world practice.
              </p>
              <Button
                asChild
                className="mt-8 bg-brand-gold text-white hover:bg-brand-gold-light px-8 py-5 text-sm tracking-widest uppercase rounded-none"
              >
                <Link href="/book-call">Enroll Now</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Group Classes */}
      <section className="bg-brand-elevated py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <Users size={40} className="text-brand-gold mx-auto mb-4" />
            <h2 className="font-display text-4xl md:text-5xl font-light text-brand-text leading-[1.1]">
              Group Classes Available
            </h2>
            <div className="mt-6 mx-auto w-12 h-px bg-brand-gold" />
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="mt-8">
            <p className="text-brand-muted text-lg leading-relaxed">
              If you have a group of individuals (friends, siblings, or classmates), contact me for discounted rates.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="mt-8">
            <Button
              asChild
              className="bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white px-8 py-5 text-sm tracking-widest uppercase rounded-none"
            >
              <Link href="/book-call">
                Contact for Group Rates <ArrowRight size={14} className="ml-2" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Skills Students Develop */}
      <section className="bg-brand-bg py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">Outcomes</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-brand-text leading-[1.1]">
              Skills Students Develop
            </h2>
            <div className="mt-6 mx-auto w-12 h-px bg-brand-gold" />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-brand-muted text-lg text-center mb-10">Students learn how to:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-start gap-3 text-brand-muted">
                  <Check size={18} className="text-brand-gold shrink-0 mt-0.5" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final Leadership Showcase */}
      <section className="bg-brand-elevated py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal className="text-center mb-12 max-w-2xl mx-auto">
            <Mic size={40} className="text-brand-gold mx-auto mb-4" />
            <h2 className="font-display text-4xl md:text-5xl font-light text-brand-text leading-[1.1]">
              Final Leadership Showcase
            </h2>
            <div className="mt-6 mx-auto w-12 h-px bg-brand-gold" />
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="text-center">
            <p className="text-brand-muted text-lg mb-10">
              Students host or present at a mock event simulation, including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              {showcaseItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-brand-muted border border-brand-border bg-white px-5 py-4">
                  <Rocket size={16} className="text-brand-gold shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Leadership Launchpad Works */}
      <section className="bg-brand-bg py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">Why It Works</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-brand-text leading-[1.1]">
              Why Leadership Launchpad Works
            </h2>
            <div className="mt-6 mx-auto w-12 h-px bg-brand-gold" />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="text-center border border-brand-border bg-white p-8 h-full hover:border-brand-gold/40 transition-colors">
                  <div className="text-brand-gold mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="font-display text-xl text-brand-text font-light mb-2">{item.title}</h3>
                  <p className="text-brand-muted text-sm">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
