"use server"

import prisma from "@/lib/prisma"
import { currentUser } from "../auth/lib/auth"
import { Order, Order as PrismaOrder } from "@prisma/client"



export async function getOrders() {
  try {
    const user = await currentUser()
    
    if (!user?.id) {
      throw new Error("Unauthorized")
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        design: true
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return orders.map((order) => ({
      id: order.id,
      createdAt: order.createdAt.toISOString(),
      status: order.status as Order["status"],
      items: order.design
      }))
  } catch (error) {
    console.error("[ORDERS_GET]", error)
    throw new Error("Failed to fetch orders")
  }
}