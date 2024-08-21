'use client'
import { siteConfig } from "@/config/site"

import { MainNav } from "@/components/main-nav"
import { useRouter } from "next/navigation"
import { ModeToggle } from "@/components/modetoggle"

export function SiteHeader() {

  const router = useRouter()
  const handleClick = () => {
    console.log("Sign Up")
    router.push("/login")
  }
  return (
    <header className="sticky top-0 z-40 w-full bg-opacity-20 backdrop-blur border-b bg-background dark:bg-neutral-900">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <button onClick={handleClick} className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Try now
        </button>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
