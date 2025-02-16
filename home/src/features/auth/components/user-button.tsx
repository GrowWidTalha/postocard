import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import { FaUser } from "react-icons/fa";

import LogoutButton from "./logout-button";
import { LogOut } from "lucide-react";
import { useCurrentUser } from "../hooks/use-current-user";
const UserButton = () => {
    const user = useCurrentUser();
  return <DropdownMenu>
    <DropdownMenuTrigger>
        <Avatar>
            <AvatarFallback className="bg-sky-500">
                <FaUser className="text-white" />
            </AvatarFallback>
            <AvatarImage src={user?.image ? user.image : ""}/>
        </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
            <DropdownMenuItem>
                <LogOut className="size-4 mr-2"/>
                Logout
            </DropdownMenuItem>
        </LogoutButton>
    </DropdownMenuContent>
  </DropdownMenu>;
};

export default UserButton;
