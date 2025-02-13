"use client";

import { Spinner } from "@/components/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteUser, getUsersByRole } from "@/features/peoples/actions/people";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User as PrismaUser, UserRole } from "@prisma/client";

interface User extends PrismaUser {
  designs: { length: number };
  assignedOrders: { length: number };
}
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { Copy, CopyCheck, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@omit/react-confirm-dialog";

const PrintingProviderContent = ({
  printProviders,
}: {
  printProviders?: User[];
}) => {
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteUser(id);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users", UserRole.PRINTING_PROVIDER],
      });
    },
  });
  const { data, isPending } = useQuery({
    queryKey: ["users", UserRole.PRINTING_PROVIDER],
    initialData: printProviders,
    queryFn: async () => {
      console.log("QueryFn Being Called again");
      const printProviders = await getUsersByRole("PRINTING_PROVIDER");
      return printProviders;
    },
  });

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <span>{row.original.name}</span>,
      },
      {
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <div className="flex items-center">
              <p>Email</p>
            </div>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-4">
              <p>{row.original.email}</p>
            </div>
          );
        },
      },
      {
        accessorKey: "assignedOrders",
        header: "Assigned Orders",
        cell: ({ row }) => {
          return <p className="">{row.original.assignedOrders.length}</p>;
        },
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const handleDelete = async () => {
            try {
              const isConfirmed = await confirm({
                title: "Delete Item",
                description: "Are you sure you want to delete this item?",
                confirmText: "Delete",
                cancelText: "Cancel",
                // confirmButton: <Button variant={"destructive"}>Delete</Button>,
                // cancelButton: <Button variant={"outline"}>Cancel</Button>,
              });

              if (isConfirmed) {
                mutate(row.original.id);
              }
            } catch (error) {}
          };
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(row?.original?.email!)
                  }
                >
                  Copy Email
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-500"
                >
                  Delete User
                </DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [data]
  );
  const table = useReactTable({
    columns,
    data: data!,
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
        <CardTitle>Printing Providers</CardTitle>
      </CardHeader>
      <CardContent>
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

export default PrintingProviderContent;
