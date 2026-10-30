/**
 * Every photo and logo on the site, in one place.
 *
 * These are staged in /public/media because Uploadcare could not be reached from the build
 * environment. Run `bun run upload-media` (scripts/upload-media.mjs) from a machine with internet
 * access: it uploads each file to Uploadcare, rewrites the `src` values below to
 * https://ucarecdn.com/<uuid>/<filename> URLs, and deletes the staged copies.
 *
 * Source: cropped from a screen recording of myecowash.com. TODO: swap in the original
 * full-resolution files from the owner when available (same keys, same alt text).
 */
export type MediaAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const media = {
  logo: {
    src: "/media/my-eco-wash-logo.png",
    width: 188,
    height: 159,
    alt: "My Eco Wash Car Wash",
  },
  storefront: {
    src: "/media/hero-building-sign.jpg",
    width: 862,
    height: 1164,
    alt: "My Eco Wash at 18440 Pines Blvd: the MEW sign, the Free Vacuums & Air banner and the soft-cloth wash tunnel",
  },
  vacuums: {
    src: "/media/vacuum-canopies.jpg",
    width: 811,
    height: 1335,
    alt: "Lime-green shade canopies over the free vacuum stalls, with palm trees and customers' cars",
  },
  conveyor: {
    src: "/media/conveyor-car.jpg",
    width: 852,
    height: 986,
    alt: "A white sedan rolling onto the blue conveyor at the entrance of the wash tunnel",
  },
  tunnel: {
    src: "/media/tunnel-soft-cloth.jpg",
    width: 862,
    height: 644,
    alt: "A car inside the soft-cloth automatic wash tunnel",
  },
} as const satisfies Record<string, MediaAsset>;
