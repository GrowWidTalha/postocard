"use client";

import { Spinner } from "@/components/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUsersByRole } from "@/features/peoples/actions/people";
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
    orders: { length: number };
}
import { useQuery } from "@tanstack/react-query";
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

const CustomersPageContent = ({ customers }: { customers?: User[] }) => {
    const { data, isPending } = useQuery({
        queryKey: ["users", UserRole.USER],
        // @ts-ignore
        initialData: customers,
        queryFn: async () => {
            const designers = await getUsersByRole("USER");
            return designers;
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
                accessorKey: "orders",
                header: "Orders",
                cell: ({ row }) => {
                    return <p className="">{row.original.orders.length}</p>;
                },
            },
            {
                accessorKey: "actions",
                header: "Actions",
                cell: ({ row }) => {
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
                                {/* <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem> */}
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
        // @ts-ignore
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
                <CardTitle>Customers</CardTitle>
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

export default CustomersPageContent;
