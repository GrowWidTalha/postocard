import { Heart, Search, ShoppingCart } from "lucide-react";
import { User } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { FaUsers } from "react-icons/fa";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="w-full border-b-2 border-gray-300 p-4  ">
      <div className="max-w-7xl mx-auto w-full  flex justify-between ">
        <div className="flex items-center gap-2 ">
          <Link href="/">
            <img src="4.jpg" alt="alt" width={50} height={70} className="w-[50px] h-[32px] md:w-[60px] md:h-[40px] cursor-pointer"/>
          </Link>
          <h1 className="text-3xl font-bold text-yellow-500">
            Posto Card
          </h1>
        </div>
        <div className="gap-x-24 hidden md:flex items-center justify-center mx-auto ">
          <a href={"/"} className="text-md font-normal">
            Home
          </a>
          <a href={"/Cards"} className="text-md font-normal flex items-center">
            Cards
          </a>
          <a href={"/blog"} className="text-md font-normal">
            Blog
          </a>
          <a href={"/contact"} className="text-md font-normal">
            Contact
          </a>
        </div>
        <div className=" gap-4 hidden md:flex">
          <div className="p-2 gap-2 flex ">
            {/* <span>
              <User />
            </span> */}
          </div>
          {/* <Button variant={"outline"} size={"icon"} className="rounded-full">
            <Heart />
          </Button>
          <Button variant={"outline"} size={"icon"} className="rounded-full">
            <ShoppingCart />
          </Button>
          <Button variant={"outline"} size={"icon"} className="rounded-full">
            <Search />
          </Button> */}
        </div>
        {/* / */}
      </div>
    </nav>
  );
};
export default Navbar;
