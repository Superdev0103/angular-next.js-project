import type { useInjected } from "@bubblydoo/angular-react";
import useLazyAngularModule from "../lib/use-lazy-angular-module";

const useLazyInjected: typeof useInjected = (token, notFoundValue, flags) => {
  const [ngModuleRef] = useLazyAngularModule();
  if (!ngModuleRef) return null;
  const injector = ngModuleRef?.injector;
  return injector.get(token as any, notFoundValue, flags);
}

export default useLazyInjected;
