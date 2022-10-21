import LazyAngularModuleContextProvider from "../components/lazy-angular-module-context-provider";
import configureZonejs from "../lib/configure-zonejs";
import loadAngularModule from "../lib/load-angular-module";

import '../styles/globals.css'

typeof window !== "undefined" && configureZonejs();

const moduleRefLoader = () =>
  import("angular-module/dist/demo")
    .then((m) => m.DemoModule)
    .then((m) => loadAngularModule(m));

export default function MyApp({ Component, pageProps }) {
  return (
    <LazyAngularModuleContextProvider moduleRefLoader={moduleRefLoader}>
      <Component {...pageProps} />
    </LazyAngularModuleContextProvider>
  );
}
