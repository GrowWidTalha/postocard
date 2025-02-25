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

const categorySchema = z.object({
    name: z.string(),
    thumbnailUrl: z.string(),
    thumbnailUploadId: z.string(),
    designType: z.nativeEnum(DesignType),
})

const CreateCategoryDialog = ({ children }: { children: React.ReactNode}) => {
    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: { name: "", thumbnailUrl: "", thumbnailUploadId: "", designType: DesignType.OCCASION }
    })
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof categorySchema>) => {
            const res = await createCategory(values.name, values.thumbnailUrl, values.thumbnailUploadId, values.designType)
            setOpen(false)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
            setOpen(false)
        }
    })

    const onSubmit = (values: z.infer<typeof categorySchema>) => {
        mutate(values)
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogTitle>Add Category</DialogTitle>
                <Form {...form}>
                    <form className='space-y-6' onSubmit={e => { e.preventDefault(); onSubmit(form.getValues()) }}>
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
                            name="thumbnailUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thumbnail</FormLabel>
                                 <UploadDropzone
                                    endpoint={"imageUploader"}
                                    onClientUploadComplete={(res) => {
                                        form.setValue("thumbnailUrl", res[0].url)
                                        form.setValue("thumbnailUploadId", res[0].key)
                                    }}
                                 />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="designType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Design Type</FormLabel>
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
                            <Button type="button" onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
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
