import DashboardPage from '@/components/dashboard-page'
import React from 'react'
import CategoryPageClient from './CategoryPageClient'
import CreateCategoryDialog from '@/features/categories/components/create-category-dialog'
import { Button } from '@/components/ui/button'
import { getCategories } from '@/features/designs/actions/categories.actions'
import { getAllCategories } from '@/features/categories/actions/category.actions'

const CategoryPage = async() => {
    const categories = await getAllCategories()
  return (
    <DashboardPage title='Category Page' cta={<CreateCategoryDialog>
        <Button>
            Create Category
        </Button>
    </CreateCategoryDialog>}>
        <CategoryPageClient categories={categories}/>
    </DashboardPage>
  )
}

export default CategoryPage
