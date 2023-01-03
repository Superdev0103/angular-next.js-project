const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: false });
const webpack = require('webpack');

(async () => {
  global.angularCompilerCliLinkerPlugin = (await import('@angular/compiler-cli/linker/babel')).default
  await import("@angular/compiler")
})();

/** @type {import('next').NextConfig} */
const nextJsConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "angular-module",
    "@angular/core",
    "@angular/platform-browser",
    "@angular/common",
    "@angular/router",
    "@angular/forms",
    "@angular/animations"
  ],
  experimental: {
    runtime: 'experimental-edge',
    esmExternals: 'loose'
  },
  webpack: (config, { nextRuntime }) => {
    if (!global.angularCompilerCliLinkerPlugin) throw new Error("No linker plugin available");
    config.resolveLoader.symlinks = false
    config.module.rules.push({
      // Make sure this rule doesn't disable built in css support from Next.js
      // see https://github.dev/vercel/next.js/blob/6bd789dad3bb01e2e7c8e2262bd09e8fe75812bb/packages/next/build/webpack-config.ts#L2464
      test: /\.m?js$/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: [global.angularCompilerCliLinkerPlugin],
          compact: false,
          cacheDirectory: true,
        }
      }
    })
    if (nextRuntime === 'edge') {
      // Otherwise the Edge Runtime will throw "ngDevMode is not defined" errors
      config.plugins.push(new webpack.DefinePlugin({ ngDevMode: 'false' }))
    }
    return config;
  }
}

module.exports = withBundleAnalyzer(nextJsConfig);
