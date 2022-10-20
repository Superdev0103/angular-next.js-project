import { AngularModuleContext, useInjected, useObservable } from "@bubblydoo/angular-react";
import { DemoService } from "angular-module/dist/demo";
import { useContext } from "react";

export default function AngularUsingComponent() {
  const ctx = useContext(AngularModuleContext);

  if (!ctx) throw new Error('no ctx' + typeof ctx);
  const service = useInjected(DemoService);
  const [value] = useObservable(service.value$);
  return <div>Counter display in React: {value}</div>;
}
