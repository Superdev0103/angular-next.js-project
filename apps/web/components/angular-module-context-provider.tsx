import { ReactNode, Suspense, useContext } from "react";
import { LazyAngularModuleContext } from "../lib/lazy-angular-module-context";
import { suspend } from "suspend-react";
import { AngularModuleContext } from "@bubblydoo/angular-react";

export function AngularModuleContextProvider(props: { fallback: ReactNode, children: any }) {
  return <Suspense fallback={props.fallback}>
    <SuspendingAngularModuleContextProvider>
      {props.children}
    </SuspendingAngularModuleContextProvider>
  </Suspense>;
}

function SuspendingAngularModuleContextProvider(props: {
  children: any;
}) {
  const lazyAngularModuleContext = useContext(LazyAngularModuleContext);

  const angularModuleContext = suspend(
    () => lazyAngularModuleContext(),
    [lazyAngularModuleContext]
  );

  return <AngularModuleContext.Provider value={angularModuleContext}>{props.children}</AngularModuleContext.Provider>
}
