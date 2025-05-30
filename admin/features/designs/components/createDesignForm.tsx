"use client"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type React from "react"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { designSchema } from "../schemas"
import type { z } from "zod"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/spinner"
import { Textarea } from "@/components/ui/textarea"
import CategoryDropDown from "./category-dropdown"
import SubCategoryDropDown from "./subCategory-dropdown"
import { createDesign, updateDesign } from "../actions/design.action"
import { useCurrentUser } from "@/features/auth/hooks/use-current-user"
import { getCategories, getSubCategoriesById } from "@/features/categories/actions/category.actions"
import { Skeleton } from "@/components/ui/skeleton"
import type { Design, DesignType } from "@prisma/client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CustomImageUploader from "@/components/custom-image-uploader"

type FormProps = {
    type: "create" | "update"
    design?: Design
}

export const DesignForm: React.FC<FormProps> = ({ type, design }) => {
    const form = useForm<z.infer<typeof designSchema>>({
        resolver: zodResolver(designSchema),
        defaultValues: {
            name: design?.name ?? "",
            description: design?.description ?? "",
            thumbnailUrl: design?.thumbnailUrl ?? "",
            thumbnailUploadId: design?.thumbnailUploadId ?? "",
            pdfLink: design?.pdfLink ?? "",
            pdfUploadId: design?.pdfUploadId ?? "",
            published: design?.published ?? false,
            category: design?.designCategoryId ?? "",
            subCategory: design?.subCategoryId ?? "",
            type: design?.designType ?? "HOLIDAY",
        },
    })
    const queryClient = useQueryClient()
    const router = useRouter()
    const user = useCurrentUser()

    useEffect(() => {
        form.setValue("subCategory", "")
    }, [form.watch("category")])

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof designSchema>) => {
            if (type === "create") {
                const res = await createDesign({
                    name: values.name,
                    description: values.description,
                    designCategoryId: values.category,
                    subCategoryId: values.subCategory,
                    pdfLink: values.pdfLink,
                    pdfUploadId: values.pdfUploadId,
                    thumbnailUrl: values.thumbnailUrl,
                    thumbnailUploadId: values.thumbnailUploadId,
                    type: values.type,
                    published: values.published,
                    user: user,
                })
                if (res?.error) throw new Error(res.error)
                return res
            } else {
                // @ts-ignore
                const res = await updateDesign(design!.id, {
                    name: values.name,
                    description: values.description,
                    designCategoryId: values.category,
                    subCategoryId: values.subCategory,
                    pdfLink: values.pdfLink,
                    pdfUploadId: values.pdfUploadId,
                    thumbnailUrl: values.thumbnailUrl,
                    thumbnailUploadId: values.thumbnailUploadId,
                    designType: values.type,
                    createdBy: design?.createdBy!,
                    published: values.published,
                })
                if (res?.error) throw new Error(res.error)
                return res
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["designs"] })
            router.push("/designs")
        },
    })

    const onSubmit = (values: z.infer<typeof designSchema>) => {
        mutate(values)
    }

    const {
        data: categories,
        isFetching,
        refetch: refetchCategories,
    } = useQuery({
        refetchOnWindowFocus: false,
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await getCategories(form.getValues("type") as DesignType)
            return res.data.data
        },
    })

    const {
        data: subCategories,
        isFetching: isSubcategoriesLoading,
        refetch,
    } = useQuery({
        refetchOnWindowFocus: false,
        queryKey: ["sub-categories", form.watch("category")],
        queryFn: async () => {
            const res = await getSubCategoriesById(form.getValues("category"))
            return res
        },
        enabled: !!form.watch("category"),
    })

    useEffect(() => {
        form.setValue("category", "")
        form.setValue("subCategory", "")
        refetchCategories()
    }, [form.watch("type")])

    useEffect(() => {
        refetch()
    }, [form.watch("category")])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Design Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Design Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Design description" {...field} />
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
                            <FormLabel>Page 1</FormLabel>
                            <FormControl>
                                <CustomImageUploader
                                    value={field.value}
                                    uploadId={form.getValues("thumbnailUploadId")}
                                    onChange={(url: string, uploadId: string) => {
                                        form.setValue("thumbnailUrl", url)
                                        form.setValue("thumbnailUploadId", uploadId)
                                    }}
                                    onRemove={() => {
                                        form.setValue("thumbnailUrl", "")
                                        form.setValue("thumbnailUploadId", "")
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pdfLink"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Page 2</FormLabel>
                            <FormControl>
                                <CustomImageUploader
                                    value={field.value}
                                    uploadId={form.getValues("pdfUploadId")}
                                    onChange={(url: string, uploadId: string) => {
                                        form.setValue("pdfLink", url)
                                        form.setValue("pdfUploadId", uploadId)
                                    }}
                                    onRemove={() => {
                                        form.setValue("pdfLink", "")
                                        form.setValue("pdfUploadId", "")
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Grand Category</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="OCCASION" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Occasion</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="HOLIDAY" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Holiday</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {form.getValues("type") && (
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2">
                                <FormLabel>Parent Category</FormLabel>
                                <FormControl>
                                    {isFetching ? (
                                        <Skeleton className="w-40 h-10" />
                                    ) : (
                                        <CategoryDropDown
                                            type={form.getValues("type")}
                                            value={field.value}
                                            onChange={field.onChange}
                                            categories={categories!}
                                        />
                                    )}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {form.getValues("category") && (
                    <FormField
                        control={form.control}
                        name="subCategory"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2">
                                <FormLabel>Child Category</FormLabel>
                                <FormControl>
                                    {isSubcategoriesLoading ? (
                                        <Skeleton className="w-40 h-10" />
                                    ) : (
                                        <SubCategoryDropDown
                                            categoryId={form.getValues("category")}
                                            value={field.value}
                                            onChange={field.onChange}
                                            categories={subCategories!}
                                        />
                                    )}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Publish</FormLabel>
                                <FormDescription>Do you want to publish this design immediately or save it as a draft?</FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>
                    {isPending && <Spinner size={"small"} className="text-white" />}
                    {type === "create" ? "Create Design" : "Update Design"}
                </Button>
            </form>
        </Form>
    )
}
