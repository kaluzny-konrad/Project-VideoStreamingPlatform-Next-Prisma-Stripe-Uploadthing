const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["uploadthing.com", "utfs.io", "stream.mux.com"],
  },
};

module.exports = withBundleAnalyzer(nextConfig)
