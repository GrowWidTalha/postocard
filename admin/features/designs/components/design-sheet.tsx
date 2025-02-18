"use client"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/spinner"
import { Design } from "@prisma/client"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateDesign } from "../actions/design.action"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, FileText, User } from "lucide-react"
import Link from "next/link"

export const DesignSheet = ({ isOpen, setIsOpen, design }: {isOpen: boolean, setIsOpen: (value: any) => void, design: Design}) => {
  const [published, setPublished] = useState(design.published)

  const queryClient = useQueryClient()

  const { mutate: updateMutate, isPending: isUpdatePending } = useMutation({
    mutationFn: async () => {
        // @ts-ignore
      await updateDesign(design.id, {
        published,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designs"] })
      setIsOpen(false)
    },
  })

  const handleUpdate = () => {
    updateMutate()
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{design.name}</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Description</Label>
            <p className="text-sm text-muted-foreground">{design.description}</p>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Badge
              className={
                design.status === "PENDING"
                  ? "bg-yellow-500"
                  : design.status === "APPROVED"
                    ? "bg-green-500"
                    : "bg-red-500"
              }
            >
              {design.status}
            </Badge>
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <p className="text-sm font-medium">{design.designType}</p>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            {/* @ts-ignore */}
            <p className="text-sm font-medium">{design.designCategory?.name || "N/A"}</p>
          </div>

          <div className="space-y-2">
            <Label>Subcategory</Label>
            {/* @ts-ignore */}
            <p className="text-sm font-medium">{design.subCategory?.name || "N/A"}</p>
          </div>

          <div className="space-y-2">
            <Label>Created By</Label>
            <div className="flex items-center gap-2 text-sm">
              <User size={16} />
              <span>{design.createdBy}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Created At</Label>
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays size={16} />
              <span>{new Date(design.createdAt).toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>PDF</Label>
            <div className="flex items-center gap-2 text-sm">
              <FileText size={16} />
              <Link
                href={design.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View PDF
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="published" checked={published} onCheckedChange={setPublished} />
            <Label htmlFor="published">Published</Label>
          </div>

          <Button disabled={isUpdatePending} onClick={handleUpdate} className="w-full">
            {isUpdatePending ? <Spinner size="small" className="text-white"/> : "Update"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
