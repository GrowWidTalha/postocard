import { DesignCategory, SubCategory } from '@prisma/client'
import React, { useState } from 'react'
import { ChevronsUpDown, Plus } from "lucide-react"
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
import CreateSubCategoryDialog from './createSubCategoryDialog'

const SubCategoryDropDown = ({ value, onChange, categories, categoryId }: { value: string, onChange: (text: string) => void, categories: SubCategory[], categoryId: string }) => {
    const [open, setOpen] = useState(false)
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[400px] justify-between"
                >
                    {value
                        ? categories.find((category) => category.id === value)?.name
                        : "Select category "}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
                <Command>
                    <CommandList>
                        <CommandEmpty>No categories found.</CommandEmpty>
                        <CommandGroup>
                            {categories?.map((category) => (
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
                    <CreateSubCategoryDialog categoryId={categoryId}>
                        <div className='flex items-center gap-2 mx-auto w-full justify-center text-xs'>
                            <Plus />
                            Add new category
                        </div>
                    </CreateSubCategoryDialog>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default SubCategoryDropDown
