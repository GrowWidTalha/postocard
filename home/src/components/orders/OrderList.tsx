"use client"

import { useEffect, useState } from "react"
import { OrderCard } from "@/components/orders/OrderCard"
import { getOrders } from "@/features/orders/actions"
import { Order } from "@prisma/client"

export function OrderList() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders()
        // @ts-ignore
        setOrders(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No orders found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        // @ts-ignore
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
} 