/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.eziswaf.net",
        port: "",
        pathname: "/v1/app/logo/**",
      },
    ],
  },
};

export default nextConfig;
