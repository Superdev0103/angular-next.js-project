import linkerPlugin from '@angular/compiler-cli/linker/babel';

export default {
  entry: './dist/demo/fesm2015/demo.mjs',
  output: {
    filename: './demo/bundled-fesm2015/demo.mjs',
  },
  optimization: {
    minimize: false,
  },
  externals: {
    tslib: 'tslib'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: 'esbuild-loader',
          options: {
            plugins: [linkerPlugin],
            compact: false,
            cacheDirectory: true,
          }
        }
      }
    ]
  }
  // ...
}
