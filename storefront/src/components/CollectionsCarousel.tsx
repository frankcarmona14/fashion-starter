// External packages
import * as React from "react"
import { twJoin } from "tailwind-merge"

// Components
import { Layout, LayoutColumn } from "@/components/Layout"
import { IconCircle } from "@/components/IconCircle"
import { Icon } from "@/components/Icon"

export type CollectionsCarouselProps = {
  heading?: React.ReactNode
} & React.ComponentPropsWithRef<"div">

export const CollectionsCarousel: React.FC<CollectionsCarouselProps> = ({
  heading,
  children,
  ...rest
}) => (
  <Layout {...rest}>
    <LayoutColumn>
      <div className="mb-8 md:mb-15 flex flex-wrap justify-between items-center gap-x-10 gap-y-2">
        {heading}
        <div className="flex gap-2">
          <ArrowButton />
          <ArrowButton className="rotate-180" />
        </div>
      </div>
      <div className="flex gap-4 md:gap-10 snap-x snap-mandatory no-scrollbar overflow-x-scroll w-screen px-[calc(50vw-50%)] -ml-[calc(50vw-50%)]">
        {React.Children.map(children, (child) => (
          <div className="w-[70%] sm:w-[60%] lg:w-full xl:max-w-[calc((100%/4)-30px)] max-w-72 flex-shrink-0 snap-center">
            {child}
          </div>
        ))}
      </div>
    </LayoutColumn>
  </Layout>
)

export const ArrowButton: React.FC<
  React.ComponentPropsWithoutRef<"button">
> = ({ className, ...rest }) => (
  <button
    {...rest}
    type="button"
    className={twJoin(
      "max-md:hidden transition-opacity",
      // prevBtnDisabled && "opacity-50"
      className
    )}
  >
    <IconCircle>
      <Icon name="arrow-left" className="w-6 h-6 text-black" />
    </IconCircle>
  </button>
)
