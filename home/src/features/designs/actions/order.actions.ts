"use server"

import { db } from "@/db"
import { currentUser } from "@/features/auth/lib/auth";
import { Design } from "@prisma/client"

interface OrderData {
    recipientName: string,
    recipientAddress: string,
    email: string,
    paypalPaymentId: string,
    senderName?: string,
    senderAddress?: string,
    from: string;
    to: string;
}

export const placeOrder = async (data: OrderData, designData:  Design & {
    customText: string; 
    quantity: number;
    price: number;
 
  }
) => {
    console.log({data, designData})
    const user = await currentUser()
    try {
        const order = await db.order.create({
            data: {
                userId: user?.id || null,
                designId: designData.id,
                customMessage: designData.customText,
                recipientName: data.recipientName,
                recipientAddress:  data.recipientAddress,
                guestEmail: data.email,
                paypalPaymentId: data.paypalPaymentId,
                senderName: data.senderName,
                senderAddress: data.senderAddress,
                from: data.from,
                to: data.to,
            }
        })

        return order
    } catch (error) {
console.log("something went wrong: ", error)
    }
}
