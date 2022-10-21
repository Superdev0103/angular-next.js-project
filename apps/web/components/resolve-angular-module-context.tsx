import { Suspense, useEffect, useState } from "react";
import SuspendingResolveAngularModuleContext from "./suspending-resolve-angular-module-context";

export default function ResolveAngularModuleContext(props: {
  fallback: any;
  children: any;
}) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  if (!loaded) return props.fallback;

  return (
    <Suspense fallback={props.fallback}>
      <SuspendingResolveAngularModuleContext serverFallback={props.fallback}>
        {props.children}
      </SuspendingResolveAngularModuleContext>
    </Suspense>
  );
}
