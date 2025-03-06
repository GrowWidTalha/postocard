"use client"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllOrders } from "@/features/orders/actions/orders.action"
import OrdersTable from "@/features/orders/components/OrdersTable"
import { type Order, OrderStatus, PrintStatus } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const OrdersClient = ({ orders: initialOrders }: { orders: Order[] }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  // Get filter values from URL
  const [printStatus, setPrintStatus] = useState(() => searchParams.get("printStatus") || "")
  const [orderStatus, setOrderStatus] = useState(() => searchParams.get("orderStatus") || "")
  const [query, setQuery] = useState(() => searchParams.get("query") || "")
  const { data: orders, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const order = await getAllOrders();

      return order;
    },
    // @ts-ignore
    initialData: initialOrders,
  });
  // Update URL when filters change
  const updateSearchParams = useCallback(() => {
    const params = new URLSearchParams(searchParams)

    if (printStatus) {
      params.set("printStatus", printStatus)
    } else {
      params.delete("printStatus")
    }

    if (orderStatus) {
      params.set("orderStatus", orderStatus)
    } else {
      params.delete("orderStatus")
    }

    if (query) {
      params.set("query", query)
    } else {
      params.delete("query")
    }

    router.push(`?${params.toString()}`)
  }, [printStatus, orderStatus, query, router, searchParams])

  // Update URL when filters change
  useEffect(() => {
    updateSearchParams()
  }, [updateSearchParams])

  // Filter orders based on current filter values
  const filteredOrders =
  // @ts-ignore
    orders?.filter((order) => {
      // Filter by search query (email)
      const matchesQuery = !query || order.guestEmail?.toLowerCase().includes(query.toLowerCase()) || false

      // Filter by print status (handle "ALL" case)
      const matchesPrintStatus = !printStatus || printStatus === "ALL" || order.printStatus === printStatus

      // Filter by order status (handle "ALL" case)
      const matchesOrderStatus = !orderStatus || orderStatus === "ALL" || order.status === orderStatus

      return matchesQuery && matchesPrintStatus && matchesOrderStatus
    }) || []

  return (
    <div>
      <OrderFilters
        printStatus={printStatus}
        setPrintStatus={setPrintStatus}
        orderStatus={orderStatus}
        setOrderStatus={setOrderStatus}
        query={query}
        setQuery={setQuery}
      />
      {/* @ts-ignore */}
      {isPending ? <div>Loading...</div> : <OrdersTable orders={filteredOrders} isPending={isPending} />}
    </div>
  );
};

export default OrdersClient;


interface OrderFiltersProps {
  printStatus: string
  setPrintStatus: (value: string) => void
  orderStatus: string
  setOrderStatus: (value: string) => void
  query: string
  setQuery: (value: string) => void
}

const OrderFilters = ({
  printStatus,
  setPrintStatus,
  orderStatus,
  setOrderStatus,
  query,
  setQuery,
}: OrderFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end">
      <div className="w-full sm:flex-1">
        <label htmlFor="search" className="text-sm font-medium mb-2 block">
          Search Orders
        </label>
        <Input
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search orders by name and email"
        />
      </div>
      <div className="w-full sm:w-[180px]">
        <label htmlFor="print-status" className="text-sm font-medium mb-2 block">
          Print Status
        </label>
        <Select onValueChange={setPrintStatus} value={printStatus}>
          <SelectTrigger id="print-status" className="bg-white">
            <SelectValue placeholder="Select print status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            {Object.values(PrintStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full sm:w-[180px]">
        <label htmlFor="order-status" className="text-sm font-medium mb-2 block">
          Order Status
        </label>
        <Select onValueChange={setOrderStatus} value={orderStatus}>
          <SelectTrigger id="order-status" className="bg-white">
            <SelectValue placeholder="Select order status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            {Object.values(OrderStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

