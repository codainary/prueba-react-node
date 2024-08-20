/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://backend:5000/api/:path*', // Redirige las solicitudes al backend
        },
      ];
    },
  };
  
  export default nextConfig;
  