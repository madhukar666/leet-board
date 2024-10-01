"use client"
import * as React from "react";
import Link from "next/link";
import { NavItem } from "@/types/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo1 from "../../public/logo1.png";
import {useEffect, useState} from "react";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user,setUser] = useState({
    username : "",
    });
  useEffect(() => {
    // Check if user is logged in
    // This is a placeholder. Replace with your actual authentication check
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem("user"));

    if(user) {
      setUser(user);
      setIsLoggedIn(true);
    }
  }, []);
  const fallback = isLoggedIn ? "problems" : "/";
  return (
    <div className="flex flex-row items-center gap-6 p-4 bg-opacity-65 md:gap-10">
      {/* Logo and Site Name */}
      <div className="flex items-center gap-4">
        <Image
          src={logo1}
          alt="leetbrd"
          className={"h-fit lg:w-20 sm:w-4"}
        />
        <Link href={fallback} className="hidden sm:flex items-center space-x-2">
          <span className="text-xl font-bold">{siteConfig.name}</span>
        </Link>
        {isLoggedIn &&(
        <Link href = "/problems" className={"hover:font-bold hover:underline"}>Problems</Link>
        )
        }
      </div>
    </div>
  );
}
