/** @type {import('next').NextConfig} */
/* const nextConfig = {};

export default nextConfig; */

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net", // Хост, с которого разрешаем загружать изображения
        pathname: "/**", // Все пути на этом домене
      },
    ],
  },
};

export default nextConfig;
