// External packages
import * as React from "react"

// Components
import { Layout, LayoutColumn } from "@/components/Layout"
import { ArrowButton } from "@/components/CollectionsCarousel"

export type CollectionsSectionCarouselProps = {
  heading?: React.ReactNode
  button?: React.ReactNode
} & React.ComponentPropsWithRef<"div">

export const CollectionsSectionCarousel: React.FC<
  CollectionsSectionCarouselProps
> = ({ heading, button, children, ...rest }) => (
  <Layout {...rest}>
    <LayoutColumn>
      <div className="mb-8 md:mb-15 flex flex-wrap justify-between items-center gap-x-10 gap-y-2">
        {heading}
        <div className="flex md:gap-6">
          {button}
          <div className="flex gap-2">
            <ArrowButton />
            <ArrowButton className="rotate-180" />
          </div>
        </div>
      </div>
      <div className="flex gap-4 md:gap-10 snap-x snap-mandatory no-scrollbar overflow-x-scroll w-screen px-[calc(50vw-50%)] -ml-[calc(50vw-50%)]">
        {React.Children.map(children, (child) => (
          <div className="w-[70%] sm:w-[60%] lg:w-full max-w-124 flex-shrink-0 snap-center">
            {child}
          </div>
        ))}
      </div>
    </LayoutColumn>
  </Layout>
)
