"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/modal";
import { UserRole } from "@prisma/client";
import React, { useState } from "react";
import CreateUserForm from "./CreateUserForm";

const CreateUserModal = ({
  buttonLabel,
  role,
}: {
  role: UserRole;
  buttonLabel: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{buttonLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new {role === "PRINTING_PROVIDER" ? "Printing Provider" : role === "ADMIN" ? "Admin" : "Designer"}</DialogTitle>
        </DialogHeader>
        <CreateUserForm role={role} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
