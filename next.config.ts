import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Deployed on Vercel. Pages are still prerendered at build time; the only
  // server code is the private board inbox under /api/inbox (see docs/inbox-setup.md).
  trailingSlash: true,
  images: {
    // Images are resized ahead of time by scripts/optimize-images.mjs.
    // The loader picks the right pre-built WebP file for each width.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
  },
};

export default nextConfig;
