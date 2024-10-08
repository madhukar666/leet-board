"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  problem_id: z.string({ required_error: "Problem id is required" }).refine(
    (val) => {
      let id = parseInt(val, 10)
      return !isNaN(id) && id > 0
    },
    { message: "Enter a valid id(Problem id should be numeric)" }
  ),
})

export function ProblemForm() {
  // ...
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problem_id: "",
    },
  })
  const [id, setId] = useState(-1)

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/problems/${values.problem_id}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
  control={form.control}
  name="problem_id"
  render={({ field }) => (
    <FormItem className="mb-6">
      <FormControl className="w-full">
        <Input
          placeholder="Problem ID"
          {...field}
          className="
            w-full px-4 py-2
            text-sm text-gray-700 dark:text-gray-300
            bg-white dark:bg-black
            border border-gray-300 dark:border-gray-700
            rounded-md focus:outline-none
            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
            focus:border-blue-500 dark:focus:border-blue-400
            transition-all duration-300 ease-in-out
          "
        />
      </FormControl>
      <FormDescription className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Enter the ID of the problem as stated in LeetCode
      </FormDescription>
      <FormMessage className="text-red-500 text-sm mt-1" />
    </FormItem>
  )}
/>


        <Button type="submit"  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">Submit
            <BottomGradient />
        </Button>
      </form>
    </Form>
  )
}
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

