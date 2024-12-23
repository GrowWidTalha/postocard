import { DesignCategory } from '@prisma/client'
import React, { useState } from 'react'
import { Check, ChevronsUpDown, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import CreateCategoryDialog from './createCategoryDialog'

const CategoryDropDown = ({ value, onChange, categories }: { value: string, onChange: (text: string) => void, categories: DesignCategory[] }) => {
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
                            <CreateCategoryDialog>
                                <div className='flex items-center gap-2 mx-auto w-full justify-center text-xs'>
                                    <Plus />
                                    Add new category
                                </div>
                            </CreateCategoryDialog>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default CategoryDropDown
