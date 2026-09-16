/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Modern formats first keeps the hero/profile image small.
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
