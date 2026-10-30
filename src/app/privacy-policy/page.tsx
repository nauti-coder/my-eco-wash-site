import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { routes, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms of Service",
  description: "My Eco Wash privacy policy and terms of service.",
};

// TODO: The original site's Privacy Policy & Terms of Service text was not captured.
// Paste the owner's approved policy here before launch.
export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Policies" title="Privacy Policy & Terms of Service" />
      <section className="container-px pb-20 pt-6 sm:pb-28">
        <div className="max-w-2xl rounded-lg border border-border bg-card p-6 sm:p-10">
          <p className="text-lg leading-relaxed">
            Our full Privacy Policy and Terms of Service are being moved to this page. If you have any questions about how we handle your
            information, or about these terms, please contact us.
          </p>
          <ul className="mt-6 grid gap-2 font-heading font-semibold">
            <li>
              <a href={site.email.href} className="text-primary underline underline-offset-4">
                {site.email.display}
              </a>
            </li>
            <li>
              <a href={site.phone.href} className="text-primary underline underline-offset-4">
                {site.phone.display}
              </a>
            </li>
            <li className="font-normal text-muted-foreground">{site.address.full}</li>
          </ul>
          <p className="mt-8 text-muted-foreground">
            Looking for the Unlimited Eco Wash Club terms?{" "}
            <Link href={routes.clubTerms} className="font-semibold text-primary underline underline-offset-4">
              Read the club terms at a glance
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
