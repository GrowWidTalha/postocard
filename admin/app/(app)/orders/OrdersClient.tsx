"use client"
import { getAllOrders } from "@/features/orders/actions/orders.action";
import OrdersTable from "@/features/orders/components/OrdersTable";
import { Order } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const OrdersClient = ({ orders: initialOrders }: { orders: Order[] }) => {
  const { data: orders, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const order = await getAllOrders();

      return order;
    },
    // @ts-ignore
    initialData: initialOrders,
  });
  return (
    <div>
        {/* @ts-ignore */}
      {isPending ? <div>Loading...</div> : <OrdersTable orders={orders!} isPending={isPending}/>}
    </div>
  );
};

export default OrdersClient;
