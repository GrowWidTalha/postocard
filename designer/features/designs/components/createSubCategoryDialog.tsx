import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createSubCategory } from '../actions/categories.actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/spinner'

const categorySchema = z.object({
    name: z.string(),
})

const CreateSubCategoryDialog = ({ children, categoryId }: { children: React.ReactNode, categoryId: string }) => {
    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: { name: "" }
    })
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof categorySchema>) => {
            const res = await createSubCategory(values.name, categoryId)
            setOpen(false)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sub-categories", categoryId] })
        }
    })

    const onSubmit = (values: z.infer<typeof categorySchema>) => {
        mutate(values)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogTitle>Add Sub Category</DialogTitle>
                <Form {...form}>
                    <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sub Category Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Sub Category Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={isPending}>
                                {isPending && <Spinner size={"small"} className="text-white" />}
                                Add Sub Category
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateSubCategoryDialog
