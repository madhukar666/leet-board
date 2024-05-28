"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
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
    { message: "Enter a valid id" }
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
            <FormItem>
              <FormLabel>Problem ID</FormLabel>
              <FormControl>
                <Input placeholder="Problem ID" {...field} />
              </FormControl>
              <FormDescription>
                Enter the ID of the problem as stated in LeetCode
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
