import { AngularModuleContext } from "@bubblydoo/angular-react";
import { useContext, useState, useEffect } from "react";
import { suspend } from "suspend-react";
import LazyAngularModuleContext from "../lib/lazy-angular-module-context";

export default function SuspendingResolveAngularModuleContext(props: {
  children: any;
  serverFallback: any;
}) {
  const lazyAngularModuleContext = useContext(LazyAngularModuleContext);

  if (!lazyAngularModuleContext) {
    throw new Error(
      "AngularModuleContextProvider needs to be used inside a LazyAngularModuleContext"
    );
  }

  const angularModuleContext = suspend(
    () => lazyAngularModuleContext(),
    [lazyAngularModuleContext]
  );

  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  if (!loaded || angularModuleContext === "IS_SERVER")
    return props.serverFallback;

  return (
    <AngularModuleContext.Provider value={angularModuleContext}>
      {props.children}
    </AngularModuleContext.Provider>
  );
}
