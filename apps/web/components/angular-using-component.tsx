import { useInjected, useObservable } from "@bubblydoo/angular-react";
import { DemoService } from "angular-module/dist/demo";

export default function AngularUsingComponent() {
  const service = useInjected(DemoService);
  const [value] = useObservable(service.value$);
  return <p>Counter display in React: {value}</p>;
}
