/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.eziswaf.net",
        port: "",
        pathname: "/v1/app/logo/**",
      },
      {
        protocol: "https",
        hostname: "images.duitku.com",
        port: "",
        pathname: "/hotlink-ok/**",
      },
    ],
  },
};

export default nextConfig;
