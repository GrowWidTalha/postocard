"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Design } from "@prisma/client";
import Image from "next/image";
import {
  CalendarDays,
  DeleteIcon,
  Edit,
  FileText,
  MoreVertical,
  Share,
  Trash,
  Trash2,
  User,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDesign } from "../actions/design.action";
import Link from "next/link";

const DesignCard = ({ design }: { design: Design }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const qclient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await deleteDesign(design.id);
    },
    onSuccess: () => {
      qclient.invalidateQueries({ queryKey: ["designs"] });
    },
  });
  const handleDelete = async () => {
    // TODO: Implement actual delete logic here
    console.log(`Deleting design with id: ${design.id}`);
    mutate();
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-0 relative">
          <div className="aspect-video relative">
            <Image
              src={design.thumbnailUrl || "/placeholder.svg"}
              alt={design.name}
              layout="fill"
              objectFit="cover"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/designs/update/${design.id}`}>
                  <Edit />
                  Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setIsDeleteDialogOpen(true)}>
                  <Trash2 className="text-red-500"/>
                  <span className="text-red-400">Delete</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Share />
                    Share</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="absolute top-2 left-2 flex items-center flex-row-reverse gap-2">
              {design.published && (
                <Badge
                  variant="secondary"
                  className="bg-white/50 backdrop-blur-sm"
                >
                  Published
                </Badge>
              )}
              <Badge
                variant={design.status === "PENDING" ? "secondary" : "default"}
                className="bg-white/50 backdrop-blur-sm"
              >
                {design.status}
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <h3 className="text-lg font-semibold">{design.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {design.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <User size={16} />
              <span>{design.createdBy}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays size={16} />
              <span>{new Date(design.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText size={16} />
              <span>PDF</span>
            </div>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this design?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              design "{design.name}" and remove it from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DesignCard;
