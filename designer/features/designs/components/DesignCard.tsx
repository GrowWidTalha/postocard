"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Design } from "@prisma/client"
import Image from "next/image"
import { Edit, MoreVertical, Share, Trash2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { DesignSheet } from "./design-sheet"
import {DeleteConfirmationDialog} from "./delete-confirmation-dialog"

const DesignCard = ({ design }: { design: Design }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false)

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-0 relative">
          <div className="aspect-video relative">
            <Image
              className="cursor-pointer"
              onClick={() => setIsDetailSheetOpen(true)}
              src={design.thumbnailUrl || "/placeholder.svg"}
              alt={design.name}
              layout="fill"
              objectFit="cover"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="absolute top-2 right-2 h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/designs/update/${design.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setIsDeleteDialogOpen(true)}>
                  <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                  <span className="text-red-400">Delete</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="absolute top-2 left-2 flex items-center flex-row-reverse gap-2">
              {design.published && (
                <Badge variant="secondary" className="bg-white/50 backdrop-blur-sm">
                  Published
                </Badge>
              )}
              <Badge
                className={
                  cn({
                    "bg-yellow-500/50": design.status === "PENDING",
                    "bg-green-500/50": design.status === "APPROVED",
                    "bg-red-500/50": design.status === "REJECTED",
                  }) + " backdrop-blur-sm"
                }
              >
                {design.status}
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <h3 className="text-lg font-semibold">{design.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{design.description}</p>
        </CardFooter>
      </Card>

      <DesignSheet isOpen={isDetailSheetOpen} setIsOpen={setIsDetailSheetOpen} design={design} />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        onDelete={() => {
          // Implement delete functionality here
          setIsDeleteDialogOpen(false)
        }}
        designName={design.name}
        isDeleting={false}
      />
    </>
  )
}

export default DesignCard
