/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/admin/review', destination: '/review' },
      { source: '/admin/inventory', destination: '/inventory' },
      { source: '/admin/verification', destination: '/verification' },
      { source: '/admin/overdue', destination: '/overdue' },
      { source: '/counter/pickups', destination: '/pickups' },
      { source: '/counter/returns', destination: '/returns' },
      { source: '/student/loans', destination: '/loans' },
      { source: '/student/catalog', destination: '/catalog' },
      { source: '/student/catalog/:id', destination: '/catalog/:id' },
      { source: '/auth/signin', destination: '/signin' },
      { source: '/auth/register', destination: '/register' },
    ];
  },
};

export default nextConfig;
