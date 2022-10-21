const withTM = require("next-transpile-modules")([
  "angular-module",
  "@angular/core",
  "@angular/platform-browser",
  "@angular/common",
  "@angular/router",
  "@angular/forms",
  "@angular/animations"
]);
const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: false });
// const withPlugins = require('next-compose-plugins');

(async () => {
  global.angularCompilerCliLinkerPlugin = (await import('@angular/compiler-cli/linker/babel')).default
  await import("@angular/compiler")
})();

// module.exports = withPlugins(
//   [
//     [withBundleAnalyzer],
//     [withTM]
//   ],
//   {
//     reactStrictMode: true,
//     experimental: {
//       concurrentFeatures: true,
//     },
//   }
// );

/** @type {import('next').NextConfig} */
const nextJsConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!global.angularCompilerCliLinkerPlugin) throw new Error("No linker plugin available");
    config.resolveLoader.symlinks = false
    config.module.rules.push({
      // Make sure this doesn't disable built in css support from Next.js
      // see https://github.dev/vercel/next.js/blob/6bd789dad3bb01e2e7c8e2262bd09e8fe75812bb/packages/next/build/webpack-config.ts#L2464
      test: /\.m?js$/,
      // include: () => true,
      // include: (p) => p.includes("@angular/") || p.includes("angular-module/"), // console.log(p) || true,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: [global.angularCompilerCliLinkerPlugin],
          compact: false,
          cacheDirectory: true,
        }
      }
    })
    return config;
  }
}

module.exports = withBundleAnalyzer(withTM(nextJsConfig));
