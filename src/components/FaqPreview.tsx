import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { faqs, routes, site, type FaqItem } from "@/lib/site";
import { cn } from "@/lib/utils";

/** The homepage shows a handful of questions, in this order; the full list lives on the FAQ page. */
const previewIds = ["how-club-works", "cancel", "vacuums", "soaps", "vehicle-restrictions"];

const previewFaqs = previewIds.flatMap((id) => faqs.filter((faq) => faq.id === id));

const contactLinks = [
  { action: "Call", href: site.phone.href, display: site.phone.display, Icon: Phone },
  { action: "Email", href: site.email.href, display: site.email.display, Icon: Mail },
];

function FaqAnswer({ faq }: { faq: FaqItem }) {
  return (
    <div className="space-y-4">
      {faq.answer.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {faq.list ? (
        <ul className="space-y-2.5">
          {faq.list.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="mt-[0.62em] size-2 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {faq.link ? (
        <Link
          href={faq.link.href}
          className="inline-flex min-h-11 items-center gap-2 font-heading font-semibold text-primary underline-offset-4 hover:underline"
        >
          {faq.link.label}
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}

/** A short FAQ on the canvas: intro and contact on the left, the questions on the right. */
export function FaqPreview() {
  return (
    <section id="faq-preview" aria-labelledby="faq-preview-heading" className="scroll-mt-20 bg-background py-20 sm:py-24 lg:py-28">
      <div className="container-px grid gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-0">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">FAQ</p>
          <h2
            id="faq-preview-heading"
            className="mt-4 text-balance text-4xl font-bold uppercase leading-[0.95] sm:text-5xl lg:text-6xl"
          >
            Good to know
          </h2>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Quick answers about the club, the wash and what to expect when you visit.
          </p>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <Accordion type="single" collapsible defaultValue={previewFaqs[0]?.id} className="border-t border-border">
            {previewFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <FaqAnswer faq={faq} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal delay={300} className="lg:col-span-5 lg:row-start-2 lg:mt-10">
          <Link href={routes.faq} className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}>
            See all FAQs
            <ArrowRight aria-hidden />
          </Link>
          <div className="mt-10">
            <h3 className="text-xl font-semibold">Still have questions?</h3>
            <ul className="mt-3 space-y-1">
              {contactLinks.map((contact) => (
                <li key={contact.action}>
                  <a
                    href={contact.href}
                    className="group inline-flex min-h-11 items-center gap-3 font-heading text-lg font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-indigo-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <contact.Icon aria-hidden className="size-[1.1rem]" />
                    </span>
                    <span className="sr-only">{contact.action} </span>
                    {contact.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
