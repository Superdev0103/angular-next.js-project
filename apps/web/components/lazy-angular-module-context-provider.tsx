import type { NgModuleRef } from "@angular/core";
import { useRef, useCallback } from "react";
import LazyAngularModuleContext from "../lib/lazy-angular-module-context";

export default function LazyAngularModuleContextProvider(props: {
  children: any;
  moduleRefLoader: () => Promise<NgModuleRef<any> | "IS_SERVER">;
}) {
  const moduleRefPromiseRef = useRef<Promise<NgModuleRef<any> | "IS_SERVER">>(null);

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
