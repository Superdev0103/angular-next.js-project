import dynamic from "next/dynamic";
import React from "react";
// import { AngularUsingPage } from "../components/angular-using-page";
// import { AngularUsingPage } from "../components/angular-using-page.client";

const AngularUsingPage = dynamic(() => import("../components/angular-using-page").then(m => m.AngularUsingPage), { ssr: false })

export default function Web() {
  return (<>
    <h1>Demo Website</h1>
    <AngularUsingPage/>
  </>);
}
