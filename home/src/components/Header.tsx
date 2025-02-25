import { ShoppingCart, Menu, X } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center p-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <img
              src="/4.jpg"
              alt="alt"
              className="w-[40px] h-[40px] cursor-pointer"
            />
          </Link>
          <h1 className="text-4xl font-bold text-yellow-500 font-serif" >PostoCard</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            href="/"
            className="text-gray-800 hover:text-yellow-500 text-lg transition duration-300 font-serif"
          >
            Home
          </Link>
          <Link
            href="/Cards"
            className="text-gray-800 hover:text-yellow-500 text-lg transition duration-300 font-serif"
          >
            Cards
          </Link>
          <Link
            href="/blog"
            className="text-gray-800 hover:text-yellow-500 text-lg transition duration-300 font-serif"
          >
            Blog
          </Link>
          <Button variant={"ghost"} size={"icon"}>
            <ShoppingCart className="text-black" />
          </Button>
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
            <SheetContent
              side="right"
              className="w-[70%] bg-white shadow-lg"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <SheetTitle className="text-3xl font-bold text-gray-800 font-serif">
                    Menu
                  </SheetTitle>
                </div>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className="text-gray-800 hover:text-yellow-500 text-lg transition duration-300 font-serif"
                  >
                    Home
                  </Link>
                  <Link
                    href="/Cards"
                    className="text-gray-800 hover:text-yellow-500 text-lg transition duration-300 font-serif"
                  >
                    Cards
                  </Link>
                  <Link
                    href="/blog"
                    className="text-gray-800 hover:text-yellow-500 text-lg transition duration-300 font-serif"
                  >
                    Blog
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
