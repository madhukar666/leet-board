import * as React from "react";
import Link from "next/link";
import { NavItem } from "@/types/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo1 from "../../public/logo1.png";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex flex-row items-center gap-6 p-4 bg-opacity-65 md:gap-10">
      {/* Logo and Site Name */}
      <div className="flex items-center gap-4">
        <Image
          src={logo1}
          alt="leetbrd"

          className={"h-fit lg:w-20 sm:w-4"}
        />
        <Link href="/" className="hidden sm:flex items-center space-x-2">
          <span className="text-xl font-bold">{siteConfig.name}</span>
        </Link>
      </div>
    </div>
  );
}
