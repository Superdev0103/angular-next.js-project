import { NgModuleRef } from "@angular/core";
import { useRef, useCallback } from "react";
import { LazyAngularModuleContext } from "../lib/lazy-angular-module-context";

export function LazyAngularModuleContextProvider(props: {
  children: any;
  moduleRefLoader: () => Promise<NgModuleRef<any>>;
}) {
  const moduleRefPromiseRef = useRef<Promise<NgModuleRef<any>>>(null);

  const moduleRefLoader = props.moduleRefLoader;

  const cachedModuleRefLoader = useCallback(() => {
    if (moduleRefPromiseRef.current) return moduleRefPromiseRef.current;
    const newModuleRefPromise = moduleRefLoader();
    moduleRefPromiseRef.current = newModuleRefPromise;
    return newModuleRefPromise;
  }, [moduleRefLoader]);

  return (
    <LazyAngularModuleContext.Provider value={cachedModuleRefLoader}>
      {props.children}
    </LazyAngularModuleContext.Provider>
  );
}
