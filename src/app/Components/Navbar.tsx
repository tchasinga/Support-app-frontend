"use client";

import * as React from "react";
import { DefaultButton, Text } from "@fluentui/react";
import ContextualMenuIconExample from "./ContextualMenuIconExample";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  
  const { data: session, status } = useSession();

  return (
    <div className="flex  items-center justify-between max-w-4xl mx-auto py-4 flex-wrap">
      <div className="flex-auto">
        <Link href="/">
          <h1 className="">Support App</h1>
        </Link>
      </div>

      <div className="flex gap-5 items-center">
        <div className="flex-1">
          <ContextualMenuIconExample />
        </div>

        <div className="flex items-center justify-center gap-3">
          {status === "loading" &&  <Text variant='medium'>Loading...</Text>}
          {status === "authenticated" ? (
            <>
              <DefaultButton
                className="w-28"
                text="Logout"
                onClick={() => signOut()}
                type="submit"
                allowDisabledFocus
              />
             <Link href="cardcreate/creating">
             <DefaultButton
                className=""
                text="Create support ticket"
              />
            </Link>

            <Link href="cardcreate">
             <DefaultButton
                className=""
                text="See all tickets"
              />
            </Link>
            </>
          ) : (
            <Link href="/login">
              <DefaultButton
                className="w-28"
                text="Login"
                type="submit"
                allowDisabledFocus
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
