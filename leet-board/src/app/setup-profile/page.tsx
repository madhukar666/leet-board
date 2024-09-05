
"use client";
import React, { FormEvent, useState,useEffect } from "react";
import { Label } from "@/components/ui/outputs";
import { Input } from "@/components/ui/inputs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfileSetUp() {

  const router = useRouter();


  const [error, setError] = useState("");
  const [username,setUserName] = useState("");
  // @ts-ignore
    const email = JSON.parse(localStorage.getItem("user")).email
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(username == ""){
        setError("Please choose any username")
        return;
    }
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email,username}),
    });

    const data = await response.json();

    if (response.status == 200) {
      router.push(`/profile/${data.username}`);
    } else {
      setError(data.message || "Username is not available");
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <div className="flex flex-col items-center font-bold justify-center">
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Choose your username
          </p>
        </div>
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <LabelInputContainer className="mb-4">
            <Label htmlFor="text">User Name</Label>
            <Input
              id="username"
              placeholder=""
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />

          </LabelInputContainer>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Set Profile &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
      {error && (
        <div className="mt-4">
          <h2 className="text-red-600 font-bold">{error}</h2>
        </div>
      )}
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);
