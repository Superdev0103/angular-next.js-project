import React, { useCallback } from "react";
import { AngularModuleContext } from "@bubblydoo/angular-react";
import { DemoService } from "angular-module/dist/demo";
import { AngularModuleContextProvider } from "../components/angular-module-context-provider";
import AngularUsingComponent from "../components/angular-using-component";
import { LazyAngularWrapper } from "../components/lazy-angular-wrapper";

export default function Index() {
  const componentLoader = useCallback(
    () => import("angular-module/dist/demo").then((m) => m.DemoComponent),
    []
  );

  return (
    <>
      <h1>Next.js with Angular Demo</h1>
      <AngularModuleContextProvider fallback={<>Loading Angular context...</>}>
        <AngularUsingComponent />
        <AngularModuleContext.Consumer>
          {(moduleRef) => (
            <button className="p-2" onClick={() => moduleRef.injector.get(DemoService).add$.next(1)}>Count in React</button>
          )}
        </AngularModuleContext.Consumer>
      </AngularModuleContextProvider>
      <LazyAngularWrapper
        fallback={<div>Loading Angular Component...</div>}
        componentLoader={componentLoader}
      />
    </>
  );
}
