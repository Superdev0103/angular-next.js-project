import React, { useCallback } from "react";
import { LazyAngularWrapper } from "./lazy-angular-wrapper";
import AngularUsingComponent from "./angular-using-component.client";
import { AngularModuleContextProvider } from "./angular-module-context-provider";
import { AngularModuleContext } from "@bubblydoo/angular-react";
import { DemoService } from "angular-module/dist/demo";

export function AngularUsingPage() {
  const componentLoader = useCallback(
    () => import("angular-module/dist/demo").then((m) => m.DemoComponent),
    []
  );

  return (
    <>
      <h2>Page</h2>
      <AngularModuleContextProvider fallback={<>Loading Angular context...</>}>
        <AngularModuleContext.Consumer>
          {({ injector }) => (
            <button className="p-2" onClick={() => injector.get(DemoService).add$.next(1)}>Count in React</button>
          )}
        </AngularModuleContext.Consumer>
        <AngularUsingComponent />
      </AngularModuleContextProvider>
      <LazyAngularWrapper
        fallback={<div>Loading Angular Component...</div>}
        componentLoader={componentLoader}
      />
    </>
  );
}
