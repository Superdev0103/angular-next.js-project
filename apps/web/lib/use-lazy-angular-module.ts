import { NgModuleRef } from "@angular/core";
import { useContext, useEffect, useState } from "react";
import LazyAngularModuleContext from "./lazy-angular-module-context";

export function useLazyAngularModule(): [NgModuleRef<any> | null, boolean] {
  const lazyAngularModuleContext = useContext(LazyAngularModuleContext);

  const [moduleRef, setModuleRef] = useState<
    NgModuleRef<any> | "IS_SERVER" | null
  >(null);

  useEffect(() => {
    lazyAngularModuleContext().then((m) => {
      setModuleRef(m);
    });
  }, [lazyAngularModuleContext]);

  if (moduleRef === "IS_SERVER") {
    return [null, true];
  } else {
    return [moduleRef, false];
  }
}
