import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 dev blocks /_next/* and HMR from hosts other than localhost unless they are listed here.
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    // Scraped media is re-hosted on Uploadcare (see scripts/upload-media.mjs).
    remotePatterns: [{ protocol: "https", hostname: "ucarecdn.com" }],
  },
};

export default nextConfig;
