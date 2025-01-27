"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Blog } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, MoreVertical, Pencil, Trash } from "lucide-react";
import { useConfirm } from "@omit/react-confirm-dialog";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog } from "../actions/blogs.actions";
import Link from "next/link";

const BlogPostCard = ({ blog }: { blog: Blog }) => {
  const confirm = useConfirm();
const queryClient =useQueryClient()
  const {mutate} = useMutation({
    mutationFn: async () => {
        const res = await deleteBlog(blog.id)
        return res.data
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["blogs"]})
    }
  })

  const handleDelete = async () => {
    try {
      const isConfirmed = await confirm({
        title: "Delete Item",
        description: "Are you sure you want to delete this item?",
        confirmText: "Delete",
        cancelText: "Cancel",
        confirmButton: <Button variant={"destructive"}>Delete</Button>,
        cancelButton: <Button variant={"outline"}>Cancel</Button>,
      });

      if (isConfirmed) {
        mutate()
      }
    } catch (error) {}
  };
  return (
    <Card className="group relative rounded-lg overflow-hidden">
      <CardHeader className="p-0">
        {/* Action buttons positioned absolutely in top-right */}
        <div className="absolute top-2 right-2 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/blogs/update/${blog.id}`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={handleDelete}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Image container with gradient overlay */}
        <div className="relative w-full h-48">
          <Image
            src={blog.imageUrl!}
            alt={blog.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <CardTitle className="font-semibold text-xl truncate mb-2">
          {blog.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              blog.published ? "bg-green-500" : "bg-yellow-500"
            }`}
          />
          {blog.published ? "Published" : "Draft"}
        </CardDescription>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button variant="ghost" className="ml-auto group" size="sm">
            {/* TODO: Add view functionality */}
          View
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
