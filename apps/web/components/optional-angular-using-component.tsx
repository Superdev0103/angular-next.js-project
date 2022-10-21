import { useObservable } from "@bubblydoo/angular-react";
import { DemoService } from "angular-module/dist/demo";
import useLazyInjected from "../lib/use-lazy-injected";
import { EMPTY } from "rxjs";

export default function OptionalAngularUsingComponent() {
  const service = useLazyInjected(DemoService);
  const value$ = service?.value$ || EMPTY;
  const [value] = useObservable<string | number>(value$, "Loading...");
  return <p>Another counter display in React: {value}</p>;
}
