"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllCategories,
  getSubCategoriesByCategory,
  deleteCategory,
  deleteSubCategory,
} from "@/features/categories/actions/category.actions";
import type { DesignCategory } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import Image from "next/image";
import CreateSubCategoryDialog from "@/features/categories/components/create-subcategory-dialog";
import { Spinner } from "@/components/spinner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EmptyState from "@/components/empty-state";
import CreateCategoryDialog from "@/features/categories/components/create-category-dialog";

const CategoryPageClient = ({
  initialCategories,
}: {
  initialCategories: DesignCategory[];
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);
  const [deleteSubCategoryId, setDeleteSubCategoryId] = useState<string | null>(
    null
  );

  const queryClient = useQueryClient();

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
    initialData: initialCategories,
    refetchOnMount: false, // Ensure data is not refetched on mount if initialData is provided
  });

  const { data: subCategoriesData, isLoading: subCategoriesLoading } = useQuery(
    {
      queryKey: ["subCategories", expandedCategory],
      queryFn: () => getSubCategoriesByCategory(expandedCategory as string),
      enabled: !!expandedCategory,
    }
  );

  const { mutate: deleteCategoryMutation, isPending: deleteCategoryLoading } =
    useMutation({
      mutationFn: async (categoryId: string) => {
        await deleteCategory(categoryId);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        setDeleteCategoryId(null);
      },
    });

  const {
    mutate: deleteSubCategoryMutation,
    isPending: deleteSubCategoryLoading,
  } = useMutation({
    mutationFn: async (subCategoryId: string) => {
      await deleteSubCategory(subCategoryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subCategories", expandedCategory],
      });
      setDeleteSubCategoryId(null);
    },
  });

  const handleCategoryClick = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setDeleteCategoryId(categoryId);
  };

  const handleDeleteSubCategory = (subCategoryId: string) => {
    setDeleteSubCategoryId(subCategoryId);
  };

  const handleConfirmDeleteCategory = () => {
    if (deleteCategoryId) {
      deleteCategoryMutation(deleteCategoryId);
    }
  };

  const handleConfirmDeleteSubCategory = () => {
    if (deleteSubCategoryId) {
      deleteSubCategoryMutation(deleteSubCategoryId);
    }
  };

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold mb-6">Categories</h1>
    {categoriesLoading ? (
      <div className="flex justify-center items-center h-64">
        <Spinner size="large" />
      </div>
    ) : categoriesData && categoriesData.length > 0 ? (
      <div className="space-y-6">
        {categoriesData.map((category) => (
          <Card key={category.id} className="w-full overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="flex-grow">
                <CardHeader
                  className="flex flex-row items-center justify-between cursor-pointer p-4 md:p-6"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteCategory(category.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                    {expandedCategory === category.id ? (
                      <ChevronUp className="h-6 w-6 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                    {/* @ts-ignore */}
                  <p className="text-sm text-muted-foreground">Designs: {category.designs?.length || 0}</p>


                  <p className="text-sm text-muted-foreground">
                    {/* @ts-ignore */}
                    Subcategories: {category.subCategories?.length || 0}
                  </p>
                </CardContent>
              </div>
            </div>
            {expandedCategory === category.id && (
              <CardContent className="p-4 md:p-6 bg-muted/50">
                <h3 className="text-lg font-semibold mb-4">Subcategories</h3>
                {subCategoriesLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <Spinner size="medium" />
                  </div>
                ) : subCategoriesData && subCategoriesData.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {subCategoriesData.map((subCategory) => (
                        <Card key={subCategory.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">{subCategory.name}</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              Designs: {subCategory.designs?.length || 0}
                            </p>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteSubCategory(subCategory.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <CreateSubCategoryDialog categoryId={category.id}>
                      <Button variant="outline">Add Subcategory</Button>
                    </CreateSubCategoryDialog>
                  </div>
                ) : (
                  <div className="flex gap-5 p-4 flex-col items-start">
                    <p className="text-muted-foreground">No subcategories found</p>
                    <CreateSubCategoryDialog categoryId={category.id}>
                      <Button variant="outline">Add Subcategory</Button>
                    </CreateSubCategoryDialog>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    ) : (
      <EmptyState
        heading="No categories found"
        subHeading="Start by creating a new category"
        action={
          <CreateCategoryDialog>
            <Button>Create Category</Button>
          </CreateCategoryDialog>
        }
      />
    )}
    <Dialog open={!!deleteCategoryId} onOpenChange={(open) => !open && setDeleteCategoryId(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground">Are you sure you want to delete this category?</p>
        <DialogFooter>
          <Button variant="destructive" onClick={handleConfirmDeleteCategory} disabled={deleteCategoryLoading}>
            {deleteCategoryLoading && <Spinner size="small" className="mr-2" />}
            {deleteCategoryLoading ? "Deleting..." : "Delete"}
          </Button>
          <Button onClick={() => setDeleteCategoryId(null)} variant="outline">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Dialog open={!!deleteSubCategoryId} onOpenChange={(open) => !open && setDeleteSubCategoryId(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground">Are you sure you want to delete this subcategory?</p>
        <DialogFooter>
          <Button variant="destructive" onClick={handleConfirmDeleteSubCategory} disabled={deleteSubCategoryLoading}>
            {deleteSubCategoryLoading && <Spinner size="small" className="mr-2" />}
            {deleteSubCategoryLoading ? "Deleting..." : "Delete"}
          </Button>
          <Button onClick={() => setDeleteSubCategoryId(null)} variant="outline">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default CategoryPageClient;
