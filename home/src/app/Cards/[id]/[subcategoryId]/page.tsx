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
    <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data?.map((design) => (
        <div key={design.id} className="group cursor-pointer relative" onClick={() =>  router.push(`/design?id=${design.id}`)}>
          {/* Card container */}
          <div className="relative cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden ">
            <div className="aspect-square relative">
              <Image
                src={design.thumbnailUrl || "/placeholder.svg"}
                alt={design.name}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Loading state */}
    {isPending && (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )}
  </div>

  )
}

export default Page
