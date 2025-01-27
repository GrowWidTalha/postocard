import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useCallback, useEffect } from 'react'
import { DesignStatus } from '@prisma/client'
import { useDebounce } from '@/hooks/useDebounce'

const DesignsFilters = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [query, setQuery] = useState(() => searchParams.get('q') || '')
    const [status, setStatus] = useState(() => searchParams.get('status') || '')
    const [category, setCategory] = useState(() => searchParams.get('category') || '')

    const debouncedQuery = useDebounce(query, 300)

    const updateSearchParams = useCallback(() => {
        const params = new URLSearchParams(searchParams)
        if (debouncedQuery) {
            params.set('q', debouncedQuery)
        } else {
            params.delete('q')
        }
        if (status) {
            params.set('status', status)
        } else {
            params.delete('status')
        }
        if (category) {
            params.set('category', category)
        } else {
            params.delete('category')
        }
        router.push(`?${params.toString()}`, { scroll: false })
    }, [debouncedQuery, status, category, router, searchParams])

    useEffect(() => {
        updateSearchParams()
    }, [debouncedQuery, status, category, updateSearchParams])

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
                <label htmlFor="search" className="text-sm font-medium mb-2 block">
                    Search Designs
                </label>
                <Input
                    id="search"
                    placeholder="Search designs..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="status" className="text-sm font-medium mb-2 block">
                    Status
                </label>
                <Select value={status || ""} onValueChange={setStatus}>
                    <SelectTrigger id="status" className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {Object.values(DesignStatus).map((status) => (
                            <SelectItem key={status} value={status}>
                                {status}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label htmlFor="category" className="text-sm font-medium mb-2 block">
                    {/* TODO: fix the categories */}
                    Category
                </label>
                <Select value={category || "all"} onValueChange={setCategory}>
                    <SelectTrigger id="category" className="w-[180px]">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="logo">Logo</SelectItem>
                        <SelectItem value="brochure">Brochure</SelectItem>
                        <SelectItem value="flyer">Flyer</SelectItem>
                        <SelectItem value="poster">Poster</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default DesignsFilters
