/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'picsum.photos' }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  }
};

export default nextConfig;
