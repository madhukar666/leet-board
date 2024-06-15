"use client"

import { ProblemForm } from "@/components/custom/lc-form"

export default function ProblemCard() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-neutral-100 dark:bg-slate-950">
        <div className="relative px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 dark:ring-white sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <ProblemForm></ProblemForm>
        </div>
      </main>
    </div>
  )
}
