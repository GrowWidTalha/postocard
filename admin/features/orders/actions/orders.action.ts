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
