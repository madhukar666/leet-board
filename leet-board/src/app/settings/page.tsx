"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {useEffect, useState} from "react"
// import EditProfile from "@/components/custom/edit-profile";
import UserObject from "@/lib/UserObject";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  bio: z.string().optional(),
})


export default function SettingsPage() {
  const [selectedSection, setSelectedSection] = useState("Profile");
  const [user,setUser] = useState<UserObject | null>(null);
  const [index,setIndex] = useState(0);
  useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem("user") as string));
  },[])
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
    },
  })

    // eslint-disable-next-line react/jsx-key
  // let components = [];

    return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 p-8">
      <main className="flex w-full flex-1 flex-col gap-4">
        <div className="flex w-full max-w-6xl mx-auto gap-8">
          {/* Sidebar */}
          <nav className="w-[250px] bg-white border border-gray-200 rounded-md shadow-sm">
            <ul className="space-y-2 p-4">
              <li>
                <button
                  className={`w-full text-left py-2 px-3 rounded-md ${
                    selectedSection === "Profile" ? "bg-gray-100 font-semibold" : ""
                  }`}
                  onClick={() => {setSelectedSection("Profile");setIndex(0);}}
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left py-2 px-3 rounded-md ${
                    selectedSection === "Account" ? "bg-gray-100 font-semibold" : ""
                  }`}
                  onClick={() => setSelectedSection("Account")}
                >
                  Account
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left py-2 px-3 rounded-md ${
                    selectedSection === "Appearance" ? "bg-gray-100 font-semibold" : ""
                  }`}
                  onClick={() => setSelectedSection("Appearance")}
                >
                  Appearance
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left py-2 px-3 rounded-md ${
                    selectedSection === "Notifications" ? "bg-gray-100 font-semibold" : ""
                  }`}
                  onClick={() => setSelectedSection("Notifications")}
                >
                  Notifications
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left py-2 px-3 rounded-md ${
                    selectedSection === "Display" ? "bg-gray-100 font-semibold" : ""
                  }`}
                  onClick={() => setSelectedSection("Display")}
                >
                  Display
                </button>
              </li>
            </ul>
          </nav>

          {/* Main Content */}
          {/*  {components[index]}*/}
        </div>
      </main>
    </div>
  )
}