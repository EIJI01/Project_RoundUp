/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/reccommended",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
