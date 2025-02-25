"use server"

import { db } from "@/db"
import { Design } from "@prisma/client"

interface OrderData {
    recipientName: string,
    recipientAddress: string,
    email: string,
    paypalPaymentId: string,
    senderName?: string,
    senderAddress?: string,
}

export const placeOrder = async (data: OrderData, designData:  Design & {
    customText: string;
    quantity: number;
    price: number
  }
) => {
    console.log({data, designData})
    try {
        const order = await db.order.create({
            data: {
                designId: designData.id,
                customMessage: designData.customText,
                recipientName: data.recipientName,
                recipientAddress:  data.recipientAddress,
                guestEmail: data.email,
                paypalPaymentId: data.paypalPaymentId,
                senderName: data.senderName,
                senderAddress: data.senderAddress,
            }
        })

        return order
    } catch (error) {
console.log("something went wrong: ", error)
    }
}
