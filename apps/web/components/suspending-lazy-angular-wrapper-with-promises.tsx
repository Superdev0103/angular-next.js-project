import { NgModuleRef } from "@angular/core";
import { AngularWrapper, AngularWrapperWithModule } from "@bubblydoo/angular-react";
import { ReactNode, useEffect, useState } from "react";
import { suspend } from "suspend-react";

export default function SuspendingLazyAngularWrapperWithPromises({
  moduleRefPromise,
  componentPromise,
  serverFallback,
  ...props
}: {
  moduleRefPromise: Promise<NgModuleRef<any> | "IS_SERVER">;
  componentPromise: Promise<any>;
  serverFallback: any;
} & Omit<Parameters<typeof AngularWrapper>[0], "component">) {
  const [moduleRef, component] = suspend(
    (moduleRefPromise, componentPromise) =>
      Promise.all([moduleRefPromise, componentPromise]),
    [moduleRefPromise, componentPromise]
  );

  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  if (!loaded || moduleRef === "IS_SERVER") return serverFallback;

  return <AngularWrapperWithModule
    component={component}
    moduleRef={moduleRef}
    {...props}
  />
}
