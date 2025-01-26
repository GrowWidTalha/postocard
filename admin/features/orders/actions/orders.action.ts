"use server";
import { db } from "@/db";
import { OrderStatus } from "@prisma/client";

export const getAllOrders = async () => {
  try {
    const data = await db.order.findMany({ include: { user: true } });

    return data;
  } catch (error) {
    console.log("Error while fetching orders: ", error);
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const res = await db.order.delete({
      where: {
        id: id,
      },
    });

    return "Deleted Successfully";
  } catch (error) {
    console.log("error deleting order: ", error);
  }
};

export const assignOrder = async (orderId: string, assigneeId: string) => {
  try {
    const res = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        assigneeId: assigneeId,
      },
    });

    return "Assigneed Successfully";
  } catch (error) {
    console.log("error deleting order: ", error);
  }
};

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus
) => {
  try {
    const res = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: status,
      },
    });

    return "Status updated Successfully";
  } catch (error) {
    console.log("error deleting order: ", error);
  }
};
