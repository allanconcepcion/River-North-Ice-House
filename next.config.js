const { withFaust, getWpHostname } = require("@faustwp/core");

/** @type {import('next').NextConfig} */
module.exports = withFaust({
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  trailingSlash: true,
  experimental: {
    // swcFileReading: true,
    // Font Loaders
    // fontLoaders: [
    //   {
    //     loader: "@next/font/local",
    //     options: {
    //       display: "swap",
    //       variable: `--font-family-heading`,
    //     },
    //   },
    // ],
  },
  eslint: {
    dirs: ["components", "pages", "fragments", "lib", "styles", "utilities"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: getWpHostname(),
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: new URL(process.env.NEXT_PUBLIC_WORDPRESS_URL).hostname,
      },
    ],
  },
  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
