import type { AngularWrapper } from "@bubblydoo/angular-react";
import dynamic from "next/dynamic";
import { lazy, Suspense } from "react";

export type AngularWrapperProps = Omit<
  Parameters<typeof AngularWrapper>[0],
  "component"
>;

const LazyAngularWrapperWithLoaders = lazy(
  () => import("./suspending-lazy-angular-wrapper-with-loaders")
);

export default function LazyAngularWrapper({
  componentLoader,
  fallback,
  ...props
}: {
  componentLoader: () => Promise<any>;
  fallback: any;
} & AngularWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      <LazyAngularWrapperWithLoaders
        fallback={fallback}
        componentLoader={componentLoader}
        {...props}
      />
    </Suspense>
  );
}
