import * as React from "react"
import { useState, useEffect } from "react"
import {useRouter}  from "next/navigation";
import UserObject from "@/lib/UserObject"
import { User, Settings, LogOut,LayoutDashboardIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import img from "../../public/img.png"
export function ProfileDropDown() {
  const [user, setUser] = useState<UserObject| null>(null)

  const router = useRouter();
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    // Implement logout logic here
    localStorage.removeItem("user")
    router.push("/");
    setUser(null)
  }

  // @ts-ignore
  const profileOptions = [
      //@ts-ignore
    { label: 'Profile', icon: User, onClick: () =>router.push(`/profile/${user.username}`)},
    {label : 'Whiteboards',icon : LayoutDashboardIcon,onClick : ()=>router.push("/whiteboards")},
    { label: 'Settings', icon: Settings, onClick: () => {router.push("/settings")}},
    { label: 'Log out', icon: LogOut, onClick: handleLogout },
  ]

  if (!user) {
    return null // Or render a login button
  }

  // @ts-ignore
  // @ts-ignore
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full"
          aria-label="Open profile menu"
        >
          <Avatar>
            <AvatarImage
                //@ts-ignore
                src={img} alt={user.username} />
            <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <Avatar>
            <AvatarImage
                //@ts-ignore
                src={img} alt={user.username} />
            <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        {profileOptions.map((option) => (
          <DropdownMenuItem
            key={option.label}
            onClick={option.onClick}
            className="flex items-center cursor-pointer"
          >
            <option.icon className="mr-2 h-4 w-4" />
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}