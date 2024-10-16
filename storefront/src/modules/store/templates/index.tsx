import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import Image from "next/image"

import { getCollectionsList } from "@lib/data/collections"
import { getCategoriesList } from "@lib/data/categories"
import { getProductTypesList } from "@lib/data/product-types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Carousel } from "@/components/Carousel"
import PaginatedProducts from "./paginated-products"

const CollectionsSlider = async () => {
  const collections = await getCollectionsList(0, 20, [
    "id",
    "title",
    "handle",
    "metadata",
  ])

  if (!collections || !collections.collections.length) {
    return null
  }

  return (
    <Carousel
      heading={<h3 className="text-lg md:text-2xl">Collections</h3>}
      className="mb-26 md:mb-36"
      disableOnDesktop
    >
      {collections.collections.map((c) => (
        <LocalizedClientLink key={c.id} href={`/collections/${c.handle}`}>
          {typeof c.metadata?.image === "object" &&
            c.metadata.image &&
            "url" in c.metadata.image &&
            typeof c.metadata.image.url === "string" && (
              <Image
                src={c.metadata.image.url}
                width={992}
                height={1322}
                alt={c.title}
                className="mb-4 md:mb-6"
              />
            )}
          <h3>{c.title}</h3>
        </LocalizedClientLink>
      ))}
    </Carousel>
  )
}

const StoreTemplate = async ({
  sortBy,
  collection,
  category,
  type,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection?: string[]
  category?: string[]
  type?: string[]
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const collections = await getCollectionsList(0, 100, [
    "id",
    "title",
    "handle",
  ])
  const categories = await getCategoriesList(0, 100, ["id", "name", "handle"])
  const types = await getProductTypesList(0, 100, ["id", "value"])

  return (
    <div className="md:pt-47 py-26 md:pb-36">
      <CollectionsSlider />
      <RefinementList
        collections={Object.fromEntries(
          collections.collections.map((c) => [c.handle, c.title])
        )}
        collection={collection}
        categories={Object.fromEntries(
          categories.product_categories.map((c) => [c.handle, c.name])
        )}
        category={category}
        types={Object.fromEntries(
          types.productTypes.map((t) => [t.value, t.value])
        )}
        type={type}
        sortBy={sortBy}
      />
      <Suspense fallback={<SkeletonProductGrid />}>
        <PaginatedProducts
          sortBy={sortBy}
          page={pageNumber}
          countryCode={countryCode}
          collectionId={
            !collection
              ? undefined
              : collections.collections
                  .filter((c) => collection.includes(c.handle))
                  .map((c) => c.id)
          }
          categoryId={
            !category
              ? undefined
              : categories.product_categories
                  .filter((c) => category.includes(c.handle))
                  .map((c) => c.id)
          }
          typeId={
            !type
              ? undefined
              : types.productTypes
                  .filter((t) => type.includes(t.value))
                  .map((t) => t.id)
          }
        />
      </Suspense>
    </div>
  )
}

export default StoreTemplate
