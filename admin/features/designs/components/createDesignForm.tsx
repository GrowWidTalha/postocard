"use client";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { designSchema } from "../schemas";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/lib/uploadthing";
import { Switch } from "@/components/ui/switch";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Design } from "@prisma/client";
import CategoryDropDown from "./category-dropdown";
import { db } from "@/db";
import { getCategories, getSubCategoriesById } from "../actions/categories.actions";
import { Skeleton } from "@/components/ui/skeleton";
import SubCategoryDropDown from "./subCategory-dropdown";
import { createDesign } from "../actions/design.action";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";

type FormProps = {
    type: "create" | "update";
    design?: Design;
};

const CreateDesignForm: React.FC<FormProps> = ({ type, design }) => {
    const form = useForm<z.infer<typeof designSchema>>({
        resolver: zodResolver(designSchema),
        defaultValues: {
            name: design?.name ? design?.name : "",
            description: design?.description ? design?.description : "",
            thumbnailUrl: design?.thumbnailUrl ? design?.thumbnailUrl : "",
            pdfLink: design?.pdfLink ? design?.pdfLink : "",
            published: design?.published ? design?.published : false,
            category: design?.designCategoryId ? design?.designCategoryId : "",
            subCategory: design?.subCategoryId ? design?.subCategoryId : "",
        },
    });
    const queryClient = new QueryClient();
    const router = useRouter();
    const user = useCurrentUser()

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof designSchema>) => {
            const res = await createDesign({
                name: values.name,
                description: values.description,
                designCategoryId: values.category,
                subCategoryId: values.subCategory,
                pdfLink: values.pdfLink,
                thumbnailUrl: values.thumbnailUrl,
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["designs"] });
            router.push("/designs");
        },
    });

    const onSubmit = (values: z.infer<typeof designSchema>) => {
        mutate(values);
    };
    const { data: categories, isFetching } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await getCategories()
            return res.data
        }
    })
    const { data: subCategories, isFetching: isSubcategoriesLoading } = useQuery({
        queryKey: ["sub-categories"],
        queryFn: async () => {
            const res = await getSubCategoriesById(form.getValues("category"))
            return res
        }
    })

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
                            <FormLabel>Thumbnail Image</FormLabel>
                            <FormControl>
                                <UploadDropzone
                                    endpoint={"imageUploader"}
                                    onClientUploadComplete={(url) => {
                                        form.setValue("thumbnailUrl", url[0]?.url!);
                                        console.log(url);
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
                            <FormLabel>Design Pdf</FormLabel>
                            <FormControl>
                                <UploadDropzone
                                    endpoint={"imageUploader"}
                                    onClientUploadComplete={(url) => {
                                        form.setValue("pdfLink", url[0]?.url!);
                                        console.log(url);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                            <FormLabel>Design Pdf</FormLabel>
                            <FormControl>
                                {isFetching ? <Skeleton className="w-40 h-10" /> : (
                                    <CategoryDropDown
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
                <FormField
                    control={form.control}
                    name="subCategory"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                            <FormLabel>Sub Category</FormLabel>
                            <FormControl>
                                {isSubcategoriesLoading ? <Skeleton className="w-40 h-10" /> : (
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
                <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Publish</FormLabel>
                                <FormDescription>
                                    Do you want to publish this design immediately or save it as a
                                    draft?
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={(value) => {
                                        field.onChange(value);
                                        console.log(value);
                                    }}
                                />
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
    );
};

export default CreateDesignForm;
