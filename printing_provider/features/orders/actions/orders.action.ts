// "use server";
// import { db } from "@/db";
// import { currentUser } from "@/features/auth/lib/auth";
// import { OrderStatus, PrintStatus } from "@prisma/client";

// export const getAllOrders = async () => {
//   const user = await currentUser();
//   if (!user) {
//     return
//   }
//     try {
//       const data = await db.order.findMany({ include: { user: true, design: true} , where: {
//         assigneeId: user?.id
//       }});
//       return  data
//     } catch (error: any) {
//       console.error("Error while fetching orders: ", error);
//       return { error: error.message };
//     }
//   };

// export const deleteOrder = async (id: string) => {
//   try {
//     const res = await db.order.delete({
//       where: {
//         id: id,
//       },
//     });

//     return "Deleted Successfully";
//   } catch (error) {
//     console.log("error deleting order: ", error);
//   }
// };

// export const assignOrder = async (orderId: string, assigneeId: string) => {
//   try {
//     const res = await db.order.update({
//       where: {
//         id: orderId,
//       },
//       data: {
//         assigneeId: assigneeId,
//       },
//     });

//     return "Assigneed Successfully";
//   } catch (error) {
//     console.log("error deleting order: ", error);
//   }
// };

// export const updateOrderStatus = async (
//   orderId: string,
//   status: PrintStatus
// ) => {
//   try {
//     const res = await db.order.update({
//       where: {
//         id: orderId,
//       },
//       data: {
//         printStatus: status,
//       },
//     });

//     return "Status updated Successfully";
//   } catch (error) {
//     console.log("error deleting order: ", error);
//   }
// };

import { OrderStatus } from "@prisma/client";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/orders";

export const getAllOrders = async () => {
  try {
    const res = await fetch(API_BASE);
    const json = await res.json();
    return {
      data: json.data,
      success: json.success && res.ok,
      error: json.error || null,
    };
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return { data: null, success: false, error: error.message };
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    const json = await res.json();
    return {
      data: json.data,
      success: json.success && res.ok,
      error: json.error || null,
    };
  } catch (error: any) {
    console.error("Error deleting order:", error);
    return { data: null, success: false, error: error.message };
  }
};

export const assignOrder = async (orderId: string, assigneeId: string) => {
  try {
    const res = await fetch(`${API_BASE}/${orderId}/assign`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assigneeId }),
    });
    const json = await res.json();
    return {
      data: json.data,
      success: json.success && res.ok,
      error: json.error || null,
    };
  } catch (error: any) {
    console.error("Error assigning order:", error);
    return { data: null, success: false, error: error.message };
  }
};

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus
) => {
  try {
    const res = await fetch(`${API_BASE}/${orderId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const json = await res.json();
    return {
      data: json.data,
      success: json.success && res.ok,
      error: json.error || null,
    };
  } catch (error: any) {
    console.error("Error updating order status:", error);
    return { data: null, success: false, error: error.message };
  }
};
