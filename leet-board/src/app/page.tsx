
'use client'
import { useState } from "react";
import Sun from "/public/sun.svg"
import Moon from "/public/moon.svg"
import Image from "next/image"
export default function Home() {

  const [darkMode,setDarkMode] = useState(false)
  const toggle = ()=>setDarkMode(!darkMode)
  return (
    <div className={`${darkMode &&"dark"}`}>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-neutral-100 dark:bg-black">
        <div className="relative px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 dark:ring-white sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div className="flex">
          <button className = "bg-green-600 border-black justify-center w-20 h-10 font-medium rounded-sm mr-4 mb-2">
                <p className=" text-neutral-100 dark:text-black">Hello</p>
          </button>
          <button className = "w-10 h-10 rounded-sm justify-center mt-0 border border-solid outline outline-1 outline-white hover:outline-green-600 dark:border-0" onClick = {toggle}>
                        <Image src = {darkMode?Moon:Sun} alt = "sun icon" className = "justify-center ml-2"></Image>
          </button>
          </div>
        </div>
      </main>
    </div>
  );
}


