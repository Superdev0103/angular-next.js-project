import type { NgModuleRef } from "@angular/core";
import LazyAngularModuleContextProvider from "../components/lazy-angular-module-context-provider";
import configureZonejs from "../lib/configure-zonejs";
import loadAngularModule from "../lib/load-angular-module";

import "../styles/globals.css";

typeof window !== "undefined" && configureZonejs();

const moduleRefLoader = (): Promise<NgModuleRef<any> | "IS_SERVER"> => {
  if (typeof window === "undefined") return Promise.resolve("IS_SERVER");
  return import("angular-module/dist/demo")
    .then((m) => m.DemoModule)
    .then((m) => loadAngularModule(m));
};

export default function MyApp({ Component, pageProps }) {
  return (
    <LazyAngularModuleContextProvider moduleRefLoader={moduleRefLoader}>
      <Component {...pageProps} />
    </LazyAngularModuleContextProvider>
  );
}
