"use client"

import { format } from "date-fns"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Design } from "@prisma/client"


interface Order {
  id: string
  createdAt: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: Design
}

interface OrderCardProps {
  order: Order
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
          <p className="text-sm text-gray-500">
            Placed on {format(new Date(order.createdAt), "MMMM d, yyyy")}
          </p>
        </div>
        <Badge className={statusColors[order.status]}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </div>

      <div className="space-y-4">
        
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <Image
                src={order.items.thumbnailUrl}
                alt={order.items.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{order.items.name}</h4>
              <p className="text-sm text-gray-500">Quantity: {1}</p>
              <p className="text-sm text-gray-500">$5</p>
            </div>
          </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-800">Total</span>
          <span className="font-semibold text-gray-900">${5}</span>
        </div>
      </div>
    </div>
  )
} 