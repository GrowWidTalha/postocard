import {
  Home,
  LucideIcon,
  ShoppingBag,
  PackageOpen,
  Settings,
  PaintRoller,
  LogOutIcon
} from "lucide-react"
import { PinTopIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { cn } from "../lib/utils"
import { BsBoxSeamFill, BsPeopleFill } from "react-icons/bs"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import LogoutButton from "@/features/auth/components/logout-button"

interface SidebarItem {
  href: string
  icon: LucideIcon | any
  text: string
}

interface SidebarCategory {
  category: string
  items: SidebarItem[]
}

const SIDEBAR_ITEMS: SidebarCategory[] = [
//   {
//     category: "Overview",
//     items: [{ href: "/", icon: Home, text: "Dashboard" }],
//   },
  {
    category: "Products",
    items: [
      { href: "/designs", icon: PackageOpen, text: "Designs" },
    ],
  },
  {
    category: "Settings",
    items: [
      {
        href: "/settings",
        icon: Settings ,
        text: "Profile Settings",
      },
    ],
  },
]

export const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const pathName = usePathname()

  if (typeof window === 'undefined') {
    return null
  }

  return (
    <div className="flex flex-col w-full h-full max-h-screen">
    <div className="flex-shrink-0 p-4 border-b">
      <p className="hidden sm:block text-lg/7 font-semibold text-brand-900">
        Posto Card
      </p>
    </div>

    <div className="flex-grow overflow-y-auto py-4 px-2">
      <ul>
        {SIDEBAR_ITEMS.map(({ category, items }) => (
          <li key={category} className="mb-4 md:mb-8">
            <p className="text-xs font-medium leading-6 text-zinc-500">
              {category}
            </p>
            <div className="-mx-2 flex flex-1 flex-col">
              {items.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full justify-start group flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium leading-6",
                    pathName === item.href
                      ? "bg-gray-100 text-zinc-900"
                      : "text-zinc-700 hover:bg-gray-50 transition"
                  )}
                  onClick={onClose}
                >
                  <item.icon
                    className={cn(
                      "size-4",
                      pathName === item.href
                        ? "text-zinc-700"
                        : "text-zinc-500 group-hover:text-zinc-700"
                    )}
                  />
                  {item.text}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>

    <div className="flex-shrink-0 p-4 border-t">
      <LogoutButton>
        <div className="-mx-2 flex flex-1 flex-col">
          <div
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start group flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium leading-6",
              "text-zinc-700 hover:bg-gray-50 transition"
            )}
            onClick={onClose}
          >
            <LogOutIcon
              className={cn(
                "size-4",
                "text-zinc-500 group-hover:text-zinc-700"
              )}
            />
            Logout
          </div>
        </div>
      </LogoutButton>
    </div>
  </div>
  )
}
