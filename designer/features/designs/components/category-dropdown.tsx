import { DesignCategory, DesignType } from '@prisma/client'
import React, { useState, useEffect } from 'react'
import { ChevronsUpDown, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import CreateCategoryDialog from './createCategoryDialog'

interface CategoryDropDownProps {
    value: string
    onChange: (text: string) => void
    categories: DesignCategory[]
    type: DesignType
}

const CategoryDropDown: React.FC<CategoryDropDownProps> = ({ value, onChange, categories, type }) => {
    const [open, setOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<DesignCategory | undefined>(
        categories.find((category) => category.id === value)
    )

    useEffect(() => {
        setSelectedCategory(categories.find((category) => category.id === value))
    }, [value, categories])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[400px] justify-between"
                >
                    {selectedCategory ? selectedCategory.name : "Select category"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
                <Command>
                    <CommandList>
                        <CommandEmpty>No categories found.</CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category.id}
                                    value={category.id}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {category.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CreateCategoryDialog type={type}>
                        <div className='flex items-center gap-2 mx-auto w-full justify-center text-xs'>
                            <Plus />
                            Add new category
                        </div>
                    </CreateCategoryDialog>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default CategoryDropDown
