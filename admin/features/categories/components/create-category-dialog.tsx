"use client"

import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/spinner'
import { DesignType } from '@prisma/client'
import { createCategory } from '../actions/category.actions'
import { UploadDropzone } from '@/lib/uploadthing'
import { toast } from 'sonner'

const categorySchema = z.object({
    name: z.string(),
    designType: z.nativeEnum(DesignType),
})

const CreateCategoryDialog = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: { name: "", designType: DesignType.OCCASION }
    })
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof categorySchema>) => {
            const res = await createCategory(values.name, values.designType)
            if (res.success) {
                return res.data
            }

            if (res.error) {
                console.log(res.error)
                throw new Error(res.error)
            }
        },
        onSuccess: () => {
            form.reset()
            toast.success("Category Created Successfully")
            setOpen(false)
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        },
        onError: (error) => {
            toast.error("Failed to create Category " + error.message,)
        }
    })

    const onSubmit = (values: z.infer<typeof categorySchema>) => {
        mutate(values)

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogTitle>Add Category</DialogTitle>
                <Form {...form}>
                    <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Birthday" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="designType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Grand Category</FormLabel>
                                    <FormControl>
                                        <div className='flex flex-col space-y-2'>
                                            {Object.values(DesignType).map((type) => (
                                                <label key={type} className='flex items-center space-x-2'>
                                                    <input type="radio" {...field} value={type} />
                                                    <span>{type.toLowerCase()}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={isPending}>
                                {isPending && <Spinner size={"small"} className="text-white" />}
                                Add Category
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCategoryDialog
