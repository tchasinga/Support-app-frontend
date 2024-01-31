"use client";

import * as React from "react";
import { Text } from "@fluentui/react";
import  ContextualMenuIconExample  from "./ContextualMenuIconExample";


export default function Navbar() {
  return (
    <div className="flex  items-center justify-between max-w-4xl mx-auto py-4">
      <div className="flex-auto">
        <h1 className="">Support App</h1>
      </div>

     <div className="flex gap-5 items-center">
      <div className="flex-1">
        <ContextualMenuIconExample />
      </div>

      <div className="">
        <Text variant="medium">Sign in</Text>
      </div>
      </div> 
    </div>
  );
}
