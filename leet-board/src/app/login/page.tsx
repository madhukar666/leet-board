"use client"
import React, { FormEvent, useState } from "react";
import { Label } from "@/components/ui/outputs";
import { Input } from "@/components/ui/inputs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Successful login
        localStorage.setItem("user",JSON.stringify(data.user));
        router.push(`/profile/${data.user.username}`); // Redirect to dashboard or appropriate page
      } else {
        // Login failed
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 sm:p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Login</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Login to access your account
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="example@domain.com"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </LabelInputContainer>
          <button
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="submit"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          New user?{" "}
          <Link href="/sign-up" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
            Sign up
          </Link>
        </p>
      </div>
      {error && (
        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("space-y-2", className)}>
    {children}
  </div>
);