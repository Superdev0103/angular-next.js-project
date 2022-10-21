import type { NgModuleRef } from "@angular/core";

const map = new WeakMap<any, Promise<NgModuleRef<any>>>();

export default function loadAngularModule(mod: any): Promise<NgModuleRef<any> | "IS_SERVER"> {
  if (typeof window === "undefined") {
    return Promise.resolve("IS_SERVER");
    // const moduleRefPromise = (async () => {
    //   try {
    //   const { platformServer } = await import("@angular/platform-server");
    //   const platformRef = platformServer();
    //   const { enableProdMode } = await import("@angular/core"); //.then(m => m.enableProdMode());
    //   enableProdMode();
    //   return await platformRef.bootstrapModule(mod, { ngZone: 'noop' });
    // } catch (e) {throw e.stack}
    // })();
    // return moduleRefPromise;
  }
  if (map.has(mod)) return map.get(mod);
  const moduleRefPromise = (async () => {
    await import("zone.js/dist/zone");
    const { platformBrowser } = await import("@angular/platform-browser");
    const platformRef = platformBrowser();
    const { enableProdMode } = await import("@angular/core"); //.then(m => m.enableProdMode());
    enableProdMode();
    return await platformRef.bootstrapModule(mod);
  })();
  map.set(mod, moduleRefPromise);
  return moduleRefPromise;
}
