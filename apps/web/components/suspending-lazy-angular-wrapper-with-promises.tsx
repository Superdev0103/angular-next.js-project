import { NgModuleRef } from "@angular/core";
import { AngularWrapper, AngularWrapperWithModule } from "@bubblydoo/angular-react";
import { suspend } from "suspend-react";

export default function SuspendingLazyAngularWrapperWithPromises({
  moduleRefPromise,
  componentPromise,
  ...props
}: {
  moduleRefPromise: Promise<NgModuleRef<any>>;
  componentPromise: Promise<any>;
} & Omit<Parameters<typeof AngularWrapper>[0], "component">) {
  const [moduleRef, component] = suspend(
    (moduleRefPromise, componentPromise) =>
      Promise.all([moduleRefPromise, componentPromise]),
    [moduleRefPromise, componentPromise]
  );

  return <AngularWrapperWithModule
    component={component}
    moduleRef={moduleRef}
    {...props}
  />
}
