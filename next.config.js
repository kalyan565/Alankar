/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Allow production builds even with ESLint warnings
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Allow production builds even with TypeScript errors
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig

