# My Eco Wash — marketing website

Replacement for myecowash.com (My Eco Wash, 18440 Pines Blvd, Pembroke Pines, FL), built with the Nautilus `carwash-website-builder` skill.

- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 3.4, bun
- **Fonts:** Outfit (headings) and Source Serif 4 (body), self-hosted via Fontsource
- **Brand tokens:** `src/app/globals.css` (all colors are HSL custom properties)
- **Content:** `src/lib/site.ts` — plans, prices, services, FAQ, hours, address, routes. Edit content here, not in components.
- **Images:** `src/lib/media.ts`

## Run it

```bash
bun install
bun run dev        # http://127.0.0.1:3000
bun run build      # production build
bun run typecheck
```

## Before launch

1. **Move images to Uploadcare.** Run `bun run upload-media` from a machine with internet access. It uploads everything in `public/media/`, rewrites `src/lib/media.ts` to `ucarecdn.com` URLs and deletes the staged files.
2. **Fill the content gaps** (each one is marked `TODO` in the code):
   - Online membership sign-up/checkout URL → `membership.onlineSignupUrl` in `src/lib/site.ts`. If My Eco Wash is (or becomes) a Nautilus organization, switch the package CTAs to the Nautilus membership checkout drawer instead.
   - Single-wash prices, and what The Basic includes (the original site didn't show them; the site shows names only)
   - Whether The Ultimate includes Underbody Rinse (the original lists it for the other two plans only)
   - Instagram and Facebook URLs → `site.social`
   - Job application links for Sales Agent and Express Crew Member → `careers.roles`
   - Privacy Policy & Terms of Service text, and the full Unlimited Eco Wash Club Terms & Conditions
   - Original full-resolution logo and photos (the current ones were cropped from a screen recording of the old site)
3. **Forms.** The old site's newsletter sign-up isn't rebuilt. If the business has a Nautilus organization, add it as a Nautilus form embed.
