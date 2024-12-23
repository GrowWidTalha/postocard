import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { QueryClient, useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createCategory } from '../actions/categories.actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/spinner'

const categorySchema = z.object({
    name: z.string(),
})

const CreateCategoryDialog = ({ children }: { children: React.ReactNode }) => {

    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: { name: "" }
    })
    const queryClient = new QueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof categorySchema>) => {
            const res = await createCategory(values.name)
            setOpen(false)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        }
    })

    const onSubmit = (values: z.infer<typeof categorySchema>) => {
        mutate(values)
    }
    return (
        <Dialog >
            <DialogTrigger> {children}</DialogTrigger>
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
                        <DialogFooter>
                            <Button type="submit" disabled={isPending}>
                                {isPending && <Spinner size={"small"} className="text-white" />}
                                Create Blog
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCategoryDialog
