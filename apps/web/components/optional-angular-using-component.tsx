import { useObservable } from "@bubblydoo/angular-react";
import { DemoService } from "angular-module/dist/demo";
import { useLazyAngularModule } from "../lib/use-lazy-angular-module";
import { of } from "rxjs";

export default function OptionalAngularUsingComponent() {
  const [moduleRef, isServer] = useLazyAngularModule();
  const value$ = moduleRef?.injector.get(DemoService).value$;
  const [value] = useObservable<string | number>(value$ || of("Loading..."));
  return <p>Another counter display in React: {value}</p>;
}
