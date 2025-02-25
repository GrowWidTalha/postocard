"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useConfirm } from "@omit/react-confirm-dialog"
import { type OrderStatus, PrintStatus, UserRole, type Order } from "@prisma/client"
import { useState } from "react"
import type React from "react"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Package,
  User,
  UserCheck,
  PaintBucket,
  MessageSquare,
  Printer,
  AlertCircle,
  CreditCard,
  RefreshCw,
  Loader2,
  Download,
} from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getUsersByRole } from "@/features/peoples/actions/people"
import { assignOrder, deleteOrder, updateOrderStatus } from "../actions/orders.action"
import { toast } from "sonner"
import { jsPDF } from "jspdf"

const OrderDetailsSheet = ({
  children,
  orderDetails,
}: {
  children: React.ReactNode
  orderDetails: Order
}) => {
  const confirm = useConfirm()
  const [assignee, setAssignee] = useState(orderDetails.assigneeId || "")
  const [status, setStatus] = useState(orderDetails.status || "")
  const queryClient = useQueryClient()

  const { data, isPending } = useQuery({
    queryKey: ["users", UserRole.PRINTING_PROVIDER],
    queryFn: async () => {
      const designers = await getUsersByRole(UserRole.PRINTING_PROVIDER)
      console.log(designers)

      return designers
    },
  })
  const { mutate: deleteOrderFn, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const res = await deleteOrder(orderDetails.id)
      return res
    },
    onSuccess: () => {
      toast.success("Order deleted successfully.")
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
  })
  const { mutate: assignOrderFn, isPending: isAssigning } = useMutation({
    mutationFn: async ({
      orderId,
      assigneeOrder,
    }: {
      orderId: string
      assigneeOrder: string
    }) => {
      const res = await assignOrder(orderId, assigneeOrder)
      if (res) {
        return res
      }
    },
    onSuccess: () => {
      toast.success("Assigned successfully.")
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
  })
  const { mutate: updateStatusFn, isPending: isStatusUpdating } = useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: {
      orderId: string
      status: string
    }) => {
      const res = await updateOrderStatus(orderId, status as PrintStatus)
      if (res) {
        return res
      }
    },
    onSuccess: () => {
      toast.success("Status Updated successfully.")
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
  })

  const handleDelete = async () => {
    try {
      const isConfirmed = await confirm({
        title: "Delete Order",
        description: "Are you sure you want to delete this order?",
        // @ts-ignore
        customActions: ({ confirm, cancel }) => (
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={cancel} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirm} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        ),
      })
      if (isConfirmed) {
        deleteOrderFn()
      }
    } catch (error) {
      console.error("Error deleting order:", error)
    }
  }

  const handleAssign = async () => {
    try {
      const isConfirmed = await confirm({
        title: "Assign Order",
        description: `Are you sure you want to assign this order to ${assignee}?`,
        // @ts-ignore
        customActions: ({ confirm, cancel }) => (
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={cancel} disabled={isAssigning}>
              Cancel
            </Button>
            <Button variant="default" onClick={confirm} disabled={isAssigning}>
              {isAssigning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Assigning...
                </>
              ) : (
                "Assign"
              )}
            </Button>
          </div>
        ),
      })
      if (isConfirmed) {
        assignOrderFn({ orderId: orderDetails.id, assigneeOrder: assignee })
      }
    } catch (error) {
      console.error("Error assigning order:", error)
    }
  }

  const handleUpdateStatus = async () => {
    try {
      const isConfirmed = await confirm({
        title: "Update Order Status",
        description: `Are you sure you want to update this order's status to ${status}?`,
        // @ts-ignore
        customActions: ({ confirm, cancel }) => (
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={cancel} disabled={isStatusUpdating}>
              Cancel
            </Button>
            <Button variant="default" onClick={confirm} disabled={isStatusUpdating}>
              {isStatusUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        ),
      })
      if (isConfirmed) {
        updateStatusFn({ orderId: orderDetails.id, status })
      }
    } catch (error) {
      console.error("Error updating order status:", error)
    }
  }

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const loadImage = (src: string, description: string): Promise<HTMLImageElement> => {
    console.log(src)
    return new Promise((resolve, reject) => {
      const img = new Image()
    //   img.crossOrigin = "anonymous"
      img.onload = () => resolve(img)
      img.onerror = (e) => {
        console.error(`Error loading ${description} image:`, e)
        reject(new Error(`Failed to load ${description} image`))
      }
      img.src = src
    })
  }

  const generatePDF = async () => {
    setIsGeneratingPDF(true)
    const doc = new jsPDF()

    try {
      // Page 1: Thumbnail
      console.log("Loading thumbnail image...")
    //   @ts-ignore
      const thumbnailImg = await loadImage(orderDetails.design?.thumbnailUrl!, "thumbnail")
      doc.addImage(thumbnailImg, "JPEG", 0, 0, 210, 297)

      // Page 2: PDF Link
      console.log("Loading PDF link image...")
      doc.addPage()
    //   @ts-ignore
      const pdfLinkImg = await loadImage(orderDetails.design?.pdfLink!, "PDF link")
      doc.addImage(pdfLinkImg, "JPEG", 0, 0, 210, 297)

      // Page 3: Custom Text
      console.log("Adding custom text page...")
      doc.addPage()
      doc.setFillColor(255, 255, 255)
      doc.rect(0, 0, 210, 297, "F")
      doc.setFont("helvetica", "italic")
      doc.setFontSize(20)
      doc.setTextColor(0, 0, 0)
      const splitText = doc.splitTextToSize(orderDetails.customMessage || "", 180)
      doc.text(splitText, 105, 148, { align: "center" })

      // Page 4: Static Image
      console.log("Loading static image...")
      doc.addPage()
      const staticImg = await loadImage("/last-page.jpg", "static")
      doc.addImage(staticImg, "JPEG", 0, 0, 210, 297)

      // Save the PDF
      doc.save(`${orderDetails.recipientName}_order.pdf`)

      toast.success("PDF generated and downloaded successfully.")
    } catch (error) {
      console.error("Error generating PDF:", error)
    //   @ts-ignore
      toast.error(`Failed to generate PDF: ${error.message}`)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle className="text-2xl">{orderDetails.recipientName}'s Order</SheetTitle>
          <SheetDescription className="flex items-center text-base">
            <Package className="mr-2 h-4 w-4" />
            {orderDetails.recipientAddress}
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Order ID</Label>
            <p className="text-sm">{orderDetails.id}</p>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">User ID</Label>
            <p className="text-sm flex items-center">
              <User className="mr-2 h-4 w-4" />
              {orderDetails.userId}
            </p>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Assignee ID</Label>
            <p className="text-sm flex items-center">
              <UserCheck className="mr-2 h-4 w-4" />
              {orderDetails.assigneeId || "Not assigned"}
            </p>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Design ID</Label>
            <p className="text-sm flex items-center">
              <PaintBucket className="mr-2 h-4 w-4" />
              {orderDetails.designId}
            </p>
          </div>
          <div className="col-span-2 space-y-2">
            <Label className="text-sm font-medium">Custom Message</Label>
            <p className="text-sm flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              {orderDetails.customMessage}
            </p>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Print Status</Label>
            <p className="text-sm flex items-center">
              <Printer className="mr-2 h-4 w-4" />
              {orderDetails.printStatus}
            </p>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Status</Label>
            <p className="text-sm flex items-center">
              <AlertCircle className="mr-2 h-4 w-4" />
              {orderDetails.status}
            </p>
          </div>
          <div className="col-span-2 space-y-2">
            <Label className="text-sm font-medium">Stripe Payment ID</Label>
            <p className="text-sm flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              {orderDetails.stripePaymentId || "Not available"}
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="update-status">Update Print Status</Label>
            <Select onValueChange={(e) => setStatus(e as OrderStatus)} value={status}>
              <SelectTrigger id="update-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(PrintStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter className="mt-4">
          <div className="flex justify-between w-full">
            <Button
              variant="default"
              onClick={handleUpdateStatus}
              className="w-full sm:w-auto"
              disabled={isStatusUpdating}
            >
              {isStatusUpdating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              {isStatusUpdating ? "Updating..." : "Update Status"}
            </Button>
            <Button
              variant="outline"
              onClick={generatePDF}
              className="w-full sm:w-auto ml-2"
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              {isGeneratingPDF ? "Generating..." : "Generate PDF"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default OrderDetailsSheet
