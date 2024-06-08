const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", pathname: "**", hostname: "uploadthing.com" },
      { protocol: "https", pathname: "**", hostname: "utfs.io" },
      { protocol: "https", pathname: "**", hostname: "stream.mux.com" },
      {
        protocol: "https",
        pathname: "**",
        hostname: "lh3.googleusercontent.com",
      },
      { protocol: "https", pathname: "**", hostname: "tailwindui.com" },
      { protocol: "https", pathname: "**", hostname: "img.clerk.com" },
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
