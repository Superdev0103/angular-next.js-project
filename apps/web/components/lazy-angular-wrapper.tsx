import { AngularWrapper } from "@bubblydoo/angular-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
// import LazyAngularWrapperWithLoaders from "./suspending-lazy-angular-wrapper.client";

export type AngularWrapperProps = Omit<
  Parameters<typeof AngularWrapper>[0],
  "component"
>;

const LazyAngularWrapperWithLoaders = dynamic(
  () => import("./suspending-lazy-angular-wrapper-with-loaders")
);

export function LazyAngularWrapper({
  componentLoader,
  fallback,
  ...props
}: {
  componentLoader: () => Promise<any>;
  fallback: React.ReactNode;
} & AngularWrapperProps) {
  if (typeof window === "undefined") return <></>;

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
