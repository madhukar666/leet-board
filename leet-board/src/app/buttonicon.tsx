'use client'


import {useState,useEffect} from "react"
export function ButtonIcon(){
    const [darkMode,setDarkMode] = useState(false);
    useEffect(()=>console.log(darkMode),[darkMode])
    const toggle = ()=> setDarkMode(!darkMode)
    return (
    <>
    
    </>
    )
}