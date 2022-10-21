import React, { useCallback } from "react";
import { DemoService } from "angular-module/dist/demo";
import ResolveAngularModuleContext from "../components/resolve-angular-module-context";
import LazyAngularWrapper from "../components/lazy-angular-wrapper";
import AngularUsingComponent from "../components/angular-using-component";
import { AngularModuleContext } from "@bubblydoo/angular-react";
import OptionalAngularUsingComponent from "../components/optional-angular-using-component";

export default function Index() {
  const componentLoader = useCallback(
    () => import("angular-module/dist/demo").then((m) => m.DemoComponent),
    []
  );

  return (
    <>
      <h1>Next.js with Angular Demo</h1>
      <ResolveAngularModuleContext fallback={<p>Loading Angular context...</p>}>
        <AngularUsingComponent />
        <AngularModuleContext.Consumer>
          {(moduleRef) => (
            <button className="p-2" onClick={() => moduleRef.injector.get(DemoService).add$.next(1)}>Count in React</button>
          )}
        </AngularModuleContext.Consumer>
      </ResolveAngularModuleContext>
      <LazyAngularWrapper
        fallback={<p>Loading Angular Component...</p>}
        componentLoader={componentLoader}
      />
      <OptionalAngularUsingComponent />
    </>
  );
}
