import { ReactNode, Suspense, useContext, useEffect, useState } from "react";
import { LazyAngularModuleContext } from "../lib/lazy-angular-module-context";
import { suspend } from "suspend-react";
import { AngularModuleContext } from "@bubblydoo/angular-react";

export function AngularModuleContextProvider(props: { fallback: ReactNode, children: any }) {
  return <Suspense fallback={props.fallback}>
    <SuspendingAngularModuleContextProvider serverFallback={props.fallback}>
      {props.children}
    </SuspendingAngularModuleContextProvider>
  </Suspense>;
}

function SuspendingAngularModuleContextProvider(props: {
  children: any;
  serverFallback: any;
}) {
  const lazyAngularModuleContext = useContext(LazyAngularModuleContext);

  if (!lazyAngularModuleContext) {
    throw new Error("AngularModuleContextProvider needs to be used inside a LazyAngularModuleContext");
  }

  const angularModuleContext = suspend(
    () => lazyAngularModuleContext(),
    [lazyAngularModuleContext]
  );

  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  if (!loaded || angularModuleContext === "IS_SERVER") return props.serverFallback;

  return <AngularModuleContext.Provider value={angularModuleContext}>{props.children}</AngularModuleContext.Provider>
}
