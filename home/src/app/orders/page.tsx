"use client"

import { useEffect, useState } from "react"
import { useCurrentUser } from "@/features/auth/hooks/use-current-user"
import { redirect } from "next/navigation"
import { OrderList } from "@/components/orders/OrderList"

export default function OrdersPage() {
  const user = useCurrentUser()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      redirect("/auth/login")
    }
    setIsLoading(false)
  }, [user])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 font-serif">Your Orders</h1>
      <OrderList />
    </div>
  )
} 