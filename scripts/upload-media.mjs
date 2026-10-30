#!/usr/bin/env node
/**
 * Re-host every staged photo/logo on Uploadcare and point the site at the CDN URLs.
 *
 *   bun run upload-media        (or: node scripts/upload-media.mjs)
 *
 * 1. Uploads each file in public/media/ with @uploadcare/upload-client.
 * 2. Rewrites "/media/<file>" in src/lib/media.ts to the returned https://ucarecdn.com/<uuid>/<file> URL.
 * 3. Deletes the staged file so no scraped media ships from public/.
 *
 * Uses NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY, falling back to the Nautilus default public key.
 */
import { uploadFile } from "@uploadcare/upload-client";
import { readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const mediaDir = path.join(root, "public", "media");
const mapFile = path.join(root, "src", "lib", "media.ts");
const publicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY ?? "0a85f6b5552d65cd05e8";

const mime = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".mp4": "video/mp4" };

const files = (await readdir(mediaDir).catch(() => [])).filter((f) => mime[path.extname(f).toLowerCase()]);
if (files.length === 0) {
  console.log("Nothing to upload: public/media is empty (already on Uploadcare?).");
  process.exit(0);
}

let map = await readFile(mapFile, "utf8");
for (const file of files) {
  const result = await uploadFile(await readFile(path.join(mediaDir, file)), {
    publicKey,
    fileName: file,
    contentType: mime[path.extname(file).toLowerCase()],
    store: "auto",
  });
  const cdnUrl = result.cdnUrl.endsWith(file) ? result.cdnUrl : `${result.cdnUrl.replace(/\/?$/, "/")}${file}`;
  const before = `"/media/${file}"`;
  if (!map.includes(before)) console.warn(`  ! ${file} is not referenced in src/lib/media.ts`);
  map = map.replaceAll(before, JSON.stringify(cdnUrl));
  await rm(path.join(mediaDir, file));
  console.log(`  ${file} -> ${cdnUrl}`);
}
await writeFile(mapFile, map);
console.log("Done. src/lib/media.ts now points at Uploadcare.");
