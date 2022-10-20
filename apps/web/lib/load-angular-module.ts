import type { NgModuleRef } from "@angular/core";
const map = new WeakMap<any, Promise<NgModuleRef<any>>>();

export function loadAngularModule(mod: any) {
  if (typeof window === "undefined") return null;
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
