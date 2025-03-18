"use client"

import type React from "react"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
    getAllCategories,
    getSubCategoriesByCategory,
    deleteCategory,
    deleteSubCategory,
} from "@/features/categories/actions/category.actions"
import type { DesignCategory } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Trash2, Plus } from "lucide-react"
import CreateSubCategoryDialog from "@/features/categories/components/create-subcategory-dialog"
import { Spinner } from "@/components/spinner"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import EmptyState from "@/components/empty-state"
import CreateCategoryDialog from "@/features/categories/components/create-category-dialog"

const CategoryPageClient = ({
    initialCategories,
}: {
    initialCategories: DesignCategory[]
}) => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
    const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null)
    const [deleteSubCategoryId, setDeleteSubCategoryId] = useState<string | null>(null)

    const queryClient = useQueryClient()

    const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getAllCategories(),
        initialData: initialCategories,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })

    const { data: subCategoriesData, isLoading: subCategoriesLoading } = useQuery({
        queryKey: ["subCategories", expandedCategory],
        queryFn: () => getSubCategoriesByCategory(expandedCategory as string),
        enabled: !!expandedCategory,
        refetchOnWindowFocus: false,
    })

    const { mutate: deleteCategoryMutation, isPending: deleteCategoryLoading } = useMutation({
        mutationFn: async (categoryId: string) => {
            await deleteCategory(categoryId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
            setDeleteCategoryId(null)
        },
    })

    const { mutate: deleteSubCategoryMutation, isPending: deleteSubCategoryLoading } = useMutation({
        mutationFn: async (subCategoryId: string) => {
            await deleteSubCategory(subCategoryId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
            queryClient.invalidateQueries({ queryKey: ["subCategories", expandedCategory] })
            setDeleteSubCategoryId(null)
        },
    })

    const handleCategoryClick = (categoryId: string) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
    }

    const handleDeleteCategory = (e: React.MouseEvent, categoryId: string) => {
        e.stopPropagation()
        setDeleteCategoryId(categoryId)
    }

    const handleDeleteSubCategory = (e: React.MouseEvent, subCategoryId: string) => {
        e.stopPropagation()
        setDeleteSubCategoryId(subCategoryId)
    }

    const handleConfirmDeleteCategory = () => {
        if (deleteCategoryId) {
            deleteCategoryMutation(deleteCategoryId)
        }
    }

    const handleConfirmDeleteSubCategory = () => {
        if (deleteSubCategoryId) {
            deleteSubCategoryMutation(deleteSubCategoryId)
        }
    }

    return (
        <div className="container mx-auto p-4 pb-20 relative">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Categories</h1>
                <CreateCategoryDialog>
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        New Category
                    </Button>
                </CreateCategoryDialog>
            </div>

            {categoriesLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Spinner size="large" />
                </div>
            ) : categoriesData && categoriesData.length > 0 ? (
                <div className="space-y-4">
                    {categoriesData.map((category) => (
                        <Card
                            key={category.id}
                            className="w-full overflow-hidden border-muted shadow-sm hover:shadow transition-all duration-200"
                        >
                            <div className="flex flex-col">
                                <CardHeader
                                    className="flex flex-row items-center justify-between cursor-pointer p-4 md:p-6 bg-card hover:bg-muted/30 transition-colors duration-200"
                                    onClick={() => handleCategoryClick(category.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        <CardTitle className="text-xl">{category.name}</CardTitle>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span className="px-2 py-1 bg-muted rounded-md">
                                                {/* @ts-ignore */}
                                                {category.designs?.length || 0} designs
                                            </span>
                                            <span className="px-2 py-1 bg-muted rounded-md">
                                                {/* @ts-ignore */}
                                                {category.subCategories?.length || 0} subcategories
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                            onClick={(e) => handleDeleteCategory(e, category.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                        {expandedCategory === category.id ? (
                                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                        )}
                                    </div>
                                </CardHeader>

                                {expandedCategory === category.id && (
                                    <CardContent className="p-4 md:p-6 bg-muted/20 animate-in fade-in-50 slide-in-from-top-2 duration-200">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-semibold">Subcategories</h3>
                                            <CreateSubCategoryDialog categoryId={category.id}>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex items-center gap-1"
                                                >
                                                    <Plus className="h-3.5 w-3.5" />
                                                    Add Subcategory
                                                </Button>
                                            </CreateSubCategoryDialog>
                                        </div>

                                        {subCategoriesLoading ? (
                                            <div className="flex justify-center items-center h-32">
                                                <Spinner size="medium" />
                                            </div>
                                        ) : subCategoriesData && subCategoriesData.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {subCategoriesData.map((subCategory) => (
                                                    <Card
                                                        key={subCategory.id}
                                                        className="overflow-hidden border border-muted bg-card hover:shadow-sm transition-all duration-200"
                                                    >
                                                        <CardContent className="p-4 flex flex-col gap-3">
                                                            <div className="flex justify-between items-start">
                                                                <h4 className="font-semibold">{subCategory.name}</h4>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                                    onClick={(e) => handleDeleteSubCategory(e, subCategory.id)}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                    <span className="sr-only">Delete</span>
                                                                </Button>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm text-muted-foreground px-2 py-1 bg-muted rounded-md">
                                                                    {subCategory.designs?.length || 0} designs
                                                                </span>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg">
                                                <p className="text-muted-foreground mb-4">No subcategories found</p>
                                                <CreateSubCategoryDialog categoryId={category.id}>
                                                    <Button variant="outline" >
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Add First Subcategory
                                                    </Button>
                                                </CreateSubCategoryDialog>
                                            </div>
                                        )}
                                    </CardContent>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <EmptyState
                    heading="No categories found"
                    subHeading="Start by creating a new category"
                    action={
                        <CreateCategoryDialog>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Category
                            </Button>
                        </CreateCategoryDialog>
                    }
                />
            )}

            {/* Fixed action button for mobile */}
            <div className="md:hidden fixed bottom-6 right-6 z-10">
                <CreateCategoryDialog>
                    <Button size="lg" className="rounded-full h-14 w-14 shadow-lg">
                        <Plus className="h-6 w-6" />
                        <span className="sr-only">Create Category</span>
                    </Button>
                </CreateCategoryDialog>
            </div>

            {/* Delete Category Dialog */}
            <Dialog open={!!deleteCategoryId} onOpenChange={(open) => !open && setDeleteCategoryId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <p className="text-muted-foreground">
                        Are you sure you want to delete this category? This action cannot be undone and will also delete all
                        associated subcategories.
                    </p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteCategoryId(null)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleConfirmDeleteCategory}
                            disabled={deleteCategoryLoading}
                            className="gap-2"
                        >
                            {deleteCategoryLoading && <Spinner size="small" />}
                            {deleteCategoryLoading ? "Deleting..." : "Delete Category"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Subcategory Dialog */}
            <Dialog open={!!deleteSubCategoryId} onOpenChange={(open) => !open && setDeleteSubCategoryId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <p className="text-muted-foreground">
                        Are you sure you want to delete this subcategory? This action cannot be undone.
                    </p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteSubCategoryId(null)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleConfirmDeleteSubCategory}
                            disabled={deleteSubCategoryLoading}
                            className="gap-2"
                        >
                            {deleteSubCategoryLoading && <Spinner size="small" />}
                            {deleteSubCategoryLoading ? "Deleting..." : "Delete Subcategory"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CategoryPageClient
