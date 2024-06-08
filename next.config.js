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
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !! ToDo: find way to fix snaplet seed build error
  //   ignoreBuildErrors: true,
  // },
};

module.exports = withBundleAnalyzer(nextConfig);
