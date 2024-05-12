import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <Button
      className={
        "accent-white bg-green-500 hover:bg-green-600 dark:accent-neutral-800 mr-4"
      }
    >
      Hello
    </Button>
  )
}
