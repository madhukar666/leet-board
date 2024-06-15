import * as React from "react"
import Link from "next/link"
import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import Image from "next/image";
import logo1 from "../../public/logo1.png"
interface MainNavProps {
  items?: NavItem[]
}


export function MainNav({ items }: MainNavProps) {

  return (
    <div className="flex gap-6 bg-opacity-65 md:gap-10">
        <div className="flex flex-col md:flex-row md:gap-1">
        <Image src={logo1} alt = {"leetbrd"} style = {{height:"100px",width:"100px"}}/>
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
            </div>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={'/problems'}
                  className={cn(
                    "flex items-center text-sm font-medium "
                  )}

                >
                  {"Problems"}
                </Link>
              )
          )}
            {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={'/whiteboards'}
                  className={cn(
                    "flex items-center text-sm font-medium "
                  )}

                >
                  {"WhiteBoards"}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
