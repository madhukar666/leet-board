"use client"

import { SiteHeader } from "@/components/header"
import Footer from "@/app/footer"
import { ModeToggle } from "@/components/modetoggle"
import { ButtonDemo } from "@/app/button"

export default function Home() {
  return (
    <div>
      <SiteHeader />
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-neutral-100 dark:bg-black">
        <div className="relative px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 dark:ring-white sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div className={"flex "}>
            <ButtonDemo />
            <ModeToggle />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
