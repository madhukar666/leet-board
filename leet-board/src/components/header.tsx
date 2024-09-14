"use client"
import React, { useState, useEffect } from 'react';
import { siteConfig } from "@/config/site";
import { MainNav } from "@/components/main-nav";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/modetoggle";
import Image from "next/image";
import userIcon from "../../public/user-circle.svg";

export function SiteHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
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

  const handleClick = () => {
    router.push("/sign-up");
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <header className="sticky top-0 z-40 w-full bg-opacity-20 backdrop-blur border-b bg-background dark:bg-neutral-900">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav}/>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ModeToggle />
            {isLoggedIn ? (
              <Image
                src={userIcon}
                alt="User profile"
                className="rounded-full object-cover w-8 h-8 cursor-pointer"
                width={32}
                height={32}
                onClick={() => router.push(`/profile/${user.username}`)}
              />
            ) : (
              <button
                onClick={handleClick}
                className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"
              >
                Try now
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}