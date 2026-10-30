import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="container-px py-24 sm:py-32">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-heading text-5xl font-extrabold uppercase leading-none sm:text-7xl">This page took a wrong turn</h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground">The page you&rsquo;re looking for doesn&rsquo;t exist. Let&rsquo;s get you back on the road.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href={routes.home} className={buttonVariants({ size: "lg" })}>
          Back to home
        </Link>
        <Link href={routes.plans} className={buttonVariants({ variant: "outline", size: "lg" })}>
          See wash plans
        </Link>
      </div>
    </section>
  );
}
