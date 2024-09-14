'use client'
import React, { useState } from "react";
import Image from "next/image";
import logo1 from "../../../public/logo1.png";
import { Label } from "@/components/ui/outputs";
import { Input } from "@/components/ui/inputs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill all the details");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        localStorage.setItem("user",JSON.stringify(data.user));
        router.push("/setup-profile");
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <div className="flex flex-row items-center justify-center">
          <Image src={logo1} alt="Brand logo" className="h-fit sm:hidden lg:block lg:w-16 lg:shrink-0" />
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome to LeetBoard
          </h2>
        </div>
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                placeholder=""
                type="text"
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                placeholder=""
                type="text"
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="example@domain.com"
              type="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </LabelInputContainer>
          <button
            className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"} &rarr;
            <BottomGradient />
          </button>
          {error && (
            <div>
              <h2 className="text-red-600 font-bold">{error}</h2>
            </div>
          )}
        </form>
        <p>
          Already have an account? <Link href="login" className="hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
