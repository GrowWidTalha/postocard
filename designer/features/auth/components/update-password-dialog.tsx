"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export const UpdatePasswordDialog = () => {
    const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const onConfirm = async () => {
   await signOut({redirectTo: "/auth/new-password"});
   router.push("/auth/new-password")
  };
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Update Password</Button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <p>Are you sure you want to update your password?</p>
            <div className="mt-4 flex justify-between">
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={onConfirm}>Confirm</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
