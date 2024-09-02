'use client'
import { siteConfig } from "@/config/site"
import {useState} from "react";
import { MainNav } from "@/components/main-nav"
import { useRouter } from "next/navigation"
import { ModeToggle } from "@/components/modetoggle"
import user  from "../../public/user-circle.svg"
import Image from "next/image";
export function SiteHeader() {

  const [login,setLogin] = useState(false)
  const router = useRouter()
  const handleClick = () => {
    console.log("Sign Up")
    router.push("/sign-up")
  }
  return (
    <header className="sticky top-0 z-40 w-full bg-opacity-20 backdrop-blur border-b bg-background dark:bg-neutral-900">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ModeToggle />
              {login && (
                  <Image src = {user} alt = {"user"} className = "rounded-full object-cover w-12 h-12" width = {'32'} height={'32'}></Image>
              )
              }
               {!login && (
            <button onClick={handleClick} className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Try now
        </button>
                )}
          </nav>
        </div>
      </div>
    </header>
  )
}
