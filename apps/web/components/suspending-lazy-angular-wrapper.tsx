import React, { Suspense, useContext, useMemo } from "react";
import { AngularWrapperProps } from "./lazy-angular-wrapper";
import SuspendingLazyAngularWrapperWithPromises from "./suspending-lazy-angular-wrapper-with-promises";
import LazyAngularModuleContext from "../lib/lazy-angular-module-context";

export default function SuspendingLazyAngularWrapper({
  componentLoader,
  fallback,
  ...props
}: {
  componentLoader: () => Promise<any>;
  fallback: any,
} & AngularWrapperProps) {
  const moduleRefLoader = useContext(LazyAngularModuleContext);

  const componentPromise = useMemo(() => componentLoader(), [componentLoader]);

  const moduleRefPromise = useMemo(() => moduleRefLoader(), [moduleRefLoader]);

  return (
    <Suspense fallback={fallback}>
      <SuspendingLazyAngularWrapperWithPromises
        componentPromise={componentPromise}
        moduleRefPromise={moduleRefPromise}
        serverFallback={fallback}
        {...props}
      />
    </Suspense>
  );
}
