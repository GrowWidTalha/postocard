"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { Design, DesignStatus } from "@prisma/client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDesign } from "../actions/design.action";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, FileText, User } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

export const DesignSheet = ({
  isOpen,
  setIsOpen,
  design,
}: {
  isOpen: boolean;
  setIsOpen: (value: any) => void;
  design: Design;
}) => {
  const [published, setPublished] = useState(design.published);
  const [setCurrentStatus, setSetCurrentStatus] = useState(design.status);
  const queryClient = useQueryClient();

  const { mutate: updateMutate, isPending: isUpdatePending } = useMutation({
    mutationFn: async () => {
      // @ts-ignore
      await updateDesign(design.id, {
        published,
        status: setCurrentStatus
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designs"] });
      setIsOpen(false);
    },
  });

  const handleUpdate = () => {
    updateMutate();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{design.name}</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Description</Label>
            <p className="text-sm text-muted-foreground">
              {design.description}
            </p>
          </div>

          <Select value={setCurrentStatus} onValueChange={(value) => setSetCurrentStatus(value as DesignStatus)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                {Object.keys(DesignStatus).map((item) => (
                  <SelectItem key={item} value={item}>
                    {item.toLowerCase()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <Label>Type</Label>
            <p className="text-sm font-medium">{design.designType}</p>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            {/* @ts-ignore */}
            <p className="text-sm font-medium">
              {design.designCategory?.name || "N/A"}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Subcategory</Label>
            {/* @ts-ignore */}
            <p className="text-sm font-medium">
              {design.subCategory?.name || "N/A"}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
            />
            <Label htmlFor="published">Published</Label>
          </div>

          <Button
            disabled={isUpdatePending}
            onClick={handleUpdate}
            className="w-full"
          >
            {isUpdatePending ? (
              <Spinner size="small" className="text-white" />
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
