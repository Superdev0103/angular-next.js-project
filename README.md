# Next.js with Angular components

This is a demo to show a Next.js project which loads Angular components using [@bubblydoo/angular-react](https://github.com/bubblydoo/angular-react).

It is configured to lazily load any Angular component.

## Troubleshooting

### `inject() must be called from an injection context` or `NG0203`

This is probably because of a version mismatch between @angular/* inside `packages/angular-module` or `apps/web`. Make sure they're the same.

For this reason we also set `compilerOptions.preserveSymlinks: true` and `config.resolveLoader.symlinks = false` (in Webpack), this corresponds to [this](https://stackoverflow.com/questions/51485868/inject-must-be-called-from-an-injection-context) setting inside Angular CLI.

### `The Angular Compiler requires TypeScript >=4.4.2 and <4.6.0 but 4.6.2 was found instead.`

This is also because of a version mismatch of `typescript` between `packages/angular-module` or `apps/web`. Ensure that they're using the same version.
