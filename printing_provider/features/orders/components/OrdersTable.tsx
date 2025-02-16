import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useConfirm } from "@omit/react-confirm-dialog";
import { Order } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import React, { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import OrderDetailsSheet from "./OrderDetailsSheet";

const OrdersTable = ({
  orders,
  isPending,
}: {
  orders: Order[];
  isPending: boolean;
}) => {
  const confirm = useConfirm();
  const columns: ColumnDef<Order>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <span>{row.original.recipientName}</span>,
      },
      {
        accessorKey: "printStatus",
        header: ({ column }) => {
          return (
            <div className="flex items-center">
              <p>Print Status</p>
            </div>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-4">
              <Badge
                className={cn(
                  row.original.printStatus === "PENDING" &&
                    "bg-slate-400 text-white",
                  row.original.printStatus === "ASSIGNED" &&
                    "bg-orange-400 text-white",
                  row.original.printStatus === "PRINTED" &&
                    "bg-blue-400 text-white",
                  row.original.printStatus === "APPROVED" &&
                    "bg-green-400 text-white",
                  row.original.printStatus === "SHIPPED" &&
                    "bg-fuchsia-400 text-white"
                )}
              >
                {row.original.printStatus}
              </Badge>
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: () => (
          <div className="">
            <p className="">Email</p>
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-4">
              <p>{row.original.user.email}</p>
            </div>
          );
        },
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({row}) => {
          return (
            <OrderDetailsSheet orderDetails={row.original}>
              <Button variant={"ghost"} size={"sm"}>
                <DotsHorizontalIcon />
              </Button>
            </OrderDetailsSheet>
          );
        },
      },
    ],
    [orders]
  );
  const table = useReactTable({
    columns,
    data: orders!,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner className="text-black" />
      </div>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isPending ? (
              [...Array(5)].map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((_, index) => (
                    <TableCell key={index}>
                      <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrdersTable;
