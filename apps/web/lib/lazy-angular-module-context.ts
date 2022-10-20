import { NgModuleRef } from "@angular/core";
import { createContext } from "react";

export const LazyAngularModuleContext = createContext<() => Promise<NgModuleRef<any> | "IS_SERVER">>(null);
