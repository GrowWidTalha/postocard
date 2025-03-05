"use client"
import { getDesignsBySubCategory } from "@/features/designs/actions/designs.actions"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter()
  const { subCategoryId } = useParams()
  const { data, isPending } = useQuery({
    queryKey: ["designs", subCategoryId],
    queryFn: async () => {
      const designs = await getDesignsBySubCategory(
        // @ts-ignore
        subCategoryId?.replace("-", " "),
      )
      return designs
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {data?.map((design) => (
            <div 
              key={design.id} 
              className="cursor-pointer"
              onClick={() => router.push(`/design?id=${design.id}`)}
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="relative" style={{ aspectRatio: '5/7' }}>
                  <Image
                    src={design.thumbnailUrl || "/placeholder.svg"}
                    alt={design.name}
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {isPending && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-yellow-500" />
          </div>
        )}

        {/* No Results */}
        {!isPending && data?.length === 0 && (
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-gray-600 text-lg">No designs found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
