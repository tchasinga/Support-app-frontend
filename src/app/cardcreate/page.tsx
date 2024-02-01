// page.jsx
"use client";
import React, { Suspense } from "react";
import Getcard from "./Getcard";
import { Text } from "@fluentui/react";
import Loading from "./Loading";

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mt-20 border-b">
        <Text variant={"mega"}>
          Get All creator Ideas <b/> support here
        </Text>
      </div>

      <Suspense fallback={<Loading />}>
        <Getcard />
      </Suspense>
    </div>
  );
}
