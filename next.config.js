const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "uploadthing.com",
      "utfs.io",
      "stream.mux.com",
      "lh3.googleusercontent.com",
      "tailwindui.com",
      "img.clerk.com",
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
