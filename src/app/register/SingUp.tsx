"use client";
import React, { useState } from "react";
import { DefaultButton, Spinner, Text, TextField } from "@fluentui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SingUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const [isSingUp, setIsSingUp] = useState<boolean>(false);
  const [isSingUpError, setIsSingUpError] = useState<string | null>(null);

  const handlerSingupChanges = (e: any) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handlerDataSingUp = async (e: any) => {
    if (!formData.username || !formData.email || !formData.password) {
      setIsSingUpError("Please fill all fields listed");
      return;
    }
    e.preventDefault();
    let data;
    try {
      setIsSingUp(true);
      setIsSingUpError(null);
      const response = await fetch(
        "http://localhost:2000/api/auth/singupuser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      data = await response.json();
      router.push("/login");
      router.refresh();
      if (data.success === false) {
        return setIsSingUpError(data.message);
      }
      setIsSingUp(false);
    } catch (error) {
      setIsSingUp(false);
      setIsSingUpError("Something went wrong, please try again later");
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col justify-center w-full items-center py-40">
      <Text variant="xxLarge">creating an account...</Text>

      <div className="">
        <form className="flex flex-col gap-4 pt-5" onSubmit={handlerDataSingUp}>
          <div>
            <TextField
              type="text"
              className="w-96"
              id="username"
              onChange={handlerSingupChanges}
              placeholder="Please enter your name here"
            />
          </div>

          <div>
            <TextField
              type="email"
              id="email"
              onChange={handlerSingupChanges}
              placeholder="Please enter your email"
            />
          </div>

          <div>
            <TextField
              placeholder="Please enter your password"
              id="password"
              onChange={handlerSingupChanges}
              type="password"
              canRevealPassword
              revealPasswordAriaLabel="Show password"
            />
          </div>
          <DefaultButton
            className="w-28"
            disabled={isSingUp}
            type="submit"
            text={isSingUp ? "Waiting..." : "Sign Up"}
            allowDisabledFocus
          />
        </form>
      </div>
      <Text className="pt-4" variant="medium">
        Have already an account?{" "}
        <Link className="text-green-500 font-normal" href="/login">
          Login
        </Link>
      </Text>
      {isSingUpError && (
        <Text className="text-red-500 pt-4" variant="medium">
          Please check your data and try again
        </Text>
      )}

    </div>
  );
}
