"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { NautilusEmbed } from "@/components/NautilusEmbed";
import { checkoutSrc, clubPlans, nautilusCheckoutEnabled, packageJoinHref, type PlanId } from "@/lib/site";

type DrawerContext = { open: (planId: PlanId, trigger: HTMLElement) => void };

const Ctx = createContext<DrawerContext | null>(null);

/**
 * One shared membership checkout drawer holding the real Nautilus storefront checkout.
 * It renders nothing until `nautilusCheckout` in lib/site.ts is filled in.
 */
export function MembershipDrawerProvider({ children }: { children: ReactNode }) {
  const [planId, setPlanId] = useState<PlanId | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((id: PlanId, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setPlanId(id);
  }, []);

  const plan = clubPlans.find((p) => p.id === planId);
  const src = planId ? checkoutSrc(planId) : null;

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {nautilusCheckoutEnabled ? (
        <Dialog.Root open={Boolean(planId)} onOpenChange={(next) => (next ? null : setPlanId(null))}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-[80] bg-navy-deep/70 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
            <Dialog.Content
              onCloseAutoFocus={(event) => {
                event.preventDefault();
                triggerRef.current?.focus();
              }}
              className="fixed inset-x-0 bottom-0 z-[90] flex max-h-[92dvh] flex-col rounded-t-[1.5rem] bg-background shadow-2xl data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-10 md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[520px] md:rounded-none md:rounded-l-[1.5rem] md:data-[state=open]:slide-in-from-right-10"
            >
              <div aria-hidden className="mx-auto mt-2.5 h-1.5 w-12 rounded-full bg-border md:hidden" />
              <div className="flex min-h-14 items-center justify-between gap-4 border-b border-border px-5">
                <Dialog.Title className="font-heading text-lg font-bold uppercase">{plan?.name ?? "Membership"}</Dialog.Title>
                <Dialog.Description className="sr-only">Secure checkout for the {plan?.name} Unlimited Eco Wash Club membership</Dialog.Description>
                <Dialog.Close aria-label="Close checkout" className="grid size-11 place-items-center rounded-full bg-muted text-secondary hover:bg-primary hover:text-primary-foreground">
                  <X aria-hidden className="size-5" />
                </Dialog.Close>
              </div>
              <div className="flex-1 overflow-y-auto">{src ? <NautilusEmbed key={src} type="storefront" src={src} /> : null}</div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ) : null}
    </Ctx.Provider>
  );
}

/**
 * A package's Join CTA. Opens the Nautilus checkout drawer when it's switched on;
 * otherwise links to the interim sign-up (`packageJoinHref`).
 */
export function JoinPlanButton({ planId, className, children }: { planId: PlanId; className?: string; children: ReactNode }) {
  const ctx = useContext(Ctx);
  if (nautilusCheckoutEnabled && ctx) {
    return (
      <button type="button" className={className} onClick={(event) => ctx.open(planId, event.currentTarget)}>
        {children}
      </button>
    );
  }
  return (
    <Link href={packageJoinHref(planId)} className={className}>
      {children}
    </Link>
  );
}
