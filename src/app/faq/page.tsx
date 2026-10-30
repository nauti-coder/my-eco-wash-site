import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { faqTopics, faqs, routes, site, type FaqItem } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about the Unlimited Eco Wash Club, cancelling, water recycling, biodegradable soaps, vehicle restrictions and free vacuums at My Eco Wash.",
};

function Answer({ faq }: { faq: FaqItem }) {
  return (
    <div className="grid gap-3">
      {faq.answer.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {faq.list ? (
        <ul className="grid gap-2 sm:grid-cols-2 sm:gap-x-8">
          {faq.list.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="mt-2.5 size-2 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {faq.link ? (
        <Link href={faq.link.href} className="font-heading font-semibold text-primary underline underline-offset-4">
          {faq.link.label}
        </Link>
      ) : null}
    </div>
  );
}

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Help center"
        title="Frequently asked questions"
        intro="Everything about the Unlimited Eco Wash Club, how we wash, and what to expect when you visit."
      />

      <section className="container-px grid gap-10 pb-16 pt-8 sm:pb-24 lg:grid-cols-[240px_1fr] lg:gap-16">
        <nav aria-label="FAQ topics" className="lg:sticky lg:top-32 lg:self-start">
          <ul className="flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:flex-col">
            {faqTopics.map((topic) => (
              <li key={topic.id} className="shrink-0">
                <a
                  href={`#${topic.id}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-5 font-heading font-semibold text-foreground transition-colors hover:border-primary hover:text-primary lg:w-full"
                >
                  {topic.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-14">
          {faqTopics.map((topic) => (
            <Reveal key={topic.id} id={topic.id} className="scroll-mt-28">
              <h2 className="font-heading text-3xl font-bold uppercase sm:text-4xl">{topic.label}</h2>
              <Accordion type="multiple" className="mt-4 border-t border-border">
                {faqs
                  .filter((faq) => faq.topic === topic.id)
                  .map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id} id={faq.id} className="scroll-mt-28">
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <Answer faq={faq} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </Reveal>
          ))}

          <Reveal className="flex flex-col gap-6 rounded-lg bg-navy p-6 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-heading text-3xl font-bold uppercase text-white">Still have questions?</h2>
              <p className="mt-2 text-white/80">Our team is happy to help — call, email or stop by any day 8am–8pm.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={site.phone.href} className={buttonVariants({ className: "w-full sm:w-auto" })}>
                <Phone aria-hidden /> {site.phone.display}
              </a>
              <a href={site.email.href} className={buttonVariants({ variant: "outline-light", className: "w-full sm:w-auto" })}>
                <Mail aria-hidden /> Email us
              </a>
            </div>
          </Reveal>
          <p className="text-muted-foreground">
            Ready to join?{" "}
            <Link href={routes.plans} className="font-semibold text-primary underline underline-offset-4">
              See the Unlimited Eco Wash Club packages
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
