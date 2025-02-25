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
import { useQuery } from '@tanstack/react-query'
import { getUsersByRole } from '@/features/peoples/actions/people'

const DesignsFilters = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const { data: users } = useQuery({
        queryKey: ["designers"],
        queryFn: async () => {
            const res = await getUsersByRole("DESIGNER")
            return res
        }
    })

    const [query, setQuery] = useState(() => searchParams.get('q') || '')
    const [status, setStatus] = useState(() => searchParams.get('status') || '')
    const [designer, setDesigner] = useState("")
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
        if(designer){
            params.set("designer", designer)
        } else {
            params.delete("designer")
        }
        router.push(`?${params.toString()}`, { scroll: false })
    }, [debouncedQuery, status, category, router, searchParams, designer])

    useEffect(() => {
        updateSearchParams()
    }, [debouncedQuery, status, category, updateSearchParams, designer])

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
                    <SelectTrigger id="status" className="w-[180px] bg-background">
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
                    <SelectTrigger id="category" className="w-[180px] bg-background">
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
            <div>
                <label htmlFor="designer" className="text-sm font-medium mb-2 block">
                    {/* TODO: fix the categories */}
                    Designer
                </label>
                <Select value={designer || ""} onValueChange={setDesigner}>
                    <SelectTrigger id="designer" className="w-[180px] bg-background">
                        <SelectValue placeholder="Select Designer" />
                    </SelectTrigger>
                    <SelectContent>
                        {users?.map((user) => (
                            <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default DesignsFilters
