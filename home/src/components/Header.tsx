"use client"

import { ShoppingCart, Menu, ChevronDown, User, Package, Settings, LogOut } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import Link from "next/link"
import { useCurrentUser } from "@/features/auth/hooks/use-current-user"
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { signOut } from "next-auth/react"

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 300) // 300ms delay before closing
  }

  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center p-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <img src="/4.jpg" alt="alt" className="w-[40px] h-[40px] cursor-pointer" />
          </Link>
          <h1 className="text-4xl font-bold text-yellow-500 font-serif">PostoCard</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-gray-800 hover:text-yellow-500 text-lg transition duration-300 font-serif">
            Home
          </Link>

          {/* Desktop Dropdown */}
          <div
            ref={dropdownRef}
            className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1 text-gray-800 hover:text-yellow-500 text-lg transition duration-300 font-serif">
              Cards <ChevronDown className="w-4 h-4" />
            </button>
            {isOpen && (
              <div 
                className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/Cards?type=holiday"
                  className="block px-4 py-2 text-gray-800 hover:text-yellow-500 hover:bg-gray-50 transition duration-300 font-serif"
                >
                  Holiday
                </Link>
                <Link
                  href="/Cards?type=occasion"
                  className="block px-4 py-2 text-gray-800 hover:text-yellow-500 hover:bg-gray-50 transition duration-300 font-serif"
                >
                  Occasion
                </Link>
              </div>
            )}
          </div>

          <Link href="/blog" className="text-gray-800 hover:text-yellow-500 text-lg transition duration-300 font-serif">
            Blog
          </Link>
          <Button variant={"ghost"} size={"icon"}>
            <ShoppingCart className="text-black" />
          </Button>
          <UserButton />
        </div>

        {/* Mobile Menu & Cart Icons */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant={"ghost"} size={"icon"}>
            <ShoppingCart className="text-black" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <Menu className="text-black" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[70%] bg-white shadow-lg">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <SheetTitle className="text-3xl font-bold text-gray-800 font-serif">Menu</SheetTitle>
                </div>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className="text-gray-800 hover:text-yellow-500 text-lg transition duration-300 font-serif"
                  >
                    Home
                  </Link>

                  {/* Mobile dropdown using Collapsible */}
                  <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen} className="w-full">
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-gray-800 hover:text-yellow-500 text-lg transition duration-300 font-serif">
                      <span>Cards</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isCollapsibleOpen ? "rotate-180" : ""}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 ml-4 border-l-2 border-gray-200 pl-4 space-y-2">
                      <Link
                        href="/Cards?type=holiday"
                        className="block text-gray-800 hover:text-yellow-500 text-lg transition duration-300 font-serif"
                      >
                        Holiday
                      </Link>
                      <Link
                        href="/Cards?type=occasion"
                        className="block text-gray-800 hover:text-yellow-500 text-lg transition duration-300 font-serif"
                      >
                        Occasion
                      </Link>
                    </CollapsibleContent>
                  </Collapsible>

                  <Link
                    href="/blog"
                    className="text-gray-800 hover:text-yellow-500 text-lg transition duration-300 font-serif"
                  >
                    Blog
                  </Link>
                  <UserButton />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


const UserButton = () => {
  const user = useCurrentUser()

  if(!user) return (
    <Link href="/auth/login">
      <Button variant="default" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
        <User className="text-white" />
        <span className="text-white">Login</span>
      </Button>
    </Link>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || ''} alt={user.email || ''} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/orders" className="flex items-center">
            <Package className="mr-2 h-4 w-4" />
            <span>Recent Orders</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/profile" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button  onClick={() => signOut()}  className="flex items-center text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}