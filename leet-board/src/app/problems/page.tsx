"use client"

import { ProblemForm } from "@/components/custom/lc-form"

export default function ProblemCard() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <ProblemForm></ProblemForm>
        </div>
    </div>
  )
}
