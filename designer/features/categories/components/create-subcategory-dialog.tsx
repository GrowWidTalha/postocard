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
import { UploadDropzone } from '@/lib/uploadthing'
import { createSubCategory } from '../actions/category.actions'

const subcategorySchema = z.object({
    name: z.string(),
    categoryId: z.string(),
})

const CreateSubCategoryDialog = ({ categoryId, children }: { categoryId: string; children: React.ReactNode}) => {
    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof subcategorySchema>>({
        resolver: zodResolver(subcategorySchema),
        defaultValues: { name: "", categoryId: categoryId }
    })
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof subcategorySchema>) => {
            const res = await createSubCategory(values.name, categoryId)
            setOpen(false)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
            setOpen(false)
        }
    })

    const onSubmit = (values: z.infer<typeof subcategorySchema>) => {
        mutate(values)
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogTitle>Add Subcategory</DialogTitle>
                <Form {...form}>
                    <form className='space-y-6' onSubmit={e => { e.preventDefault(); onSubmit(form.getValues()) }}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subcategory Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Birthday" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="button" onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
                                {isPending && <Spinner size={"small"} className="text-white" />}
                                Add Subcategory
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateSubCategoryDialog
