/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  reactStrictMode: true,
  publicRuntimeConfig: {
    APIURL: process.env.NEXT_PUBLIC_APIURL ?? 'https://api.seminarium.frenzoid.dev/api',
  },
};

export default nextConfig;
