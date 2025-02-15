import DashboardPage from "@/components/dashboard-page";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Changed import to use Shadcn Card component
import { currentUser } from "@/features/auth/lib/auth";
import Link from "next/link";
import React from "react"
import { UpdatePasswordDialog } from "@/features/auth/components/update-password-dialog";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

const pags = async () => {
  const user = await currentUser();

  if (!user) return <Spinner />;
  return (
    <DashboardPage title="Settings">
      <div className="max-w-md">
        <Card title="Profile" className="shadow-lg rounded-lg p-4">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <Input value={user?.email!} disabled className="mb-4" />
            <Input value={"********"} disabled className="mb-4" />
          </CardContent>
          <CardFooter>
            <UpdatePasswordDialog  />
          </CardFooter>
        </Card>
      </div>
    </DashboardPage>
  );
};

export default pags;
