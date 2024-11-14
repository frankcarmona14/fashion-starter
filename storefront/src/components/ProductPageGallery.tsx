// TODO: Review this component.

"use client"

// External packages
import * as React from "react"
import { twJoin, twMerge } from "tailwind-merge"
import { EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"

// Components
import { Icon } from "@/components/Icon"
import { IconCircle } from "@/components/IconCircle"

export const ProductPageGallery: React.FC<
  React.ComponentPropsWithRef<"div">
> = ({ children, className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: "trimSnaps",
    skipSnaps: true,
  })
  const [state, setState] = React.useState({
    prevBtnDisabled: true,
    nextBtnDisabled: true,
    selectedIndex: 0,
    scrollSnaps: [] as number[],
  })

  const updateState = React.useCallback((emblaApi: EmblaCarouselType) => {
    setState({
      prevBtnDisabled: !emblaApi.canScrollPrev(),
      nextBtnDisabled: !emblaApi.canScrollNext(),
      selectedIndex: emblaApi.selectedScrollSnap(),
      scrollSnaps: emblaApi.scrollSnapList(),
    })
  }, [])

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollToIndex = React.useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi]
  )

  React.useEffect(() => {
    if (!emblaApi) return

    updateState(emblaApi)
    emblaApi.on("reInit", updateState).on("select", updateState)

    return () => {
      emblaApi.off("reInit", updateState).off("select", updateState)
    }
  }, [emblaApi, updateState])

  const { prevBtnDisabled, nextBtnDisabled, selectedIndex, scrollSnaps } = state

  return (
    <div className={twMerge("overflow-hidden relative", className)}>
      <div className="relative flex items-center p-0 lg:mb-6">
        <ArrowButton scroll={scrollPrev} btnDisabled={prevBtnDisabled} />
        <div ref={emblaRef} className="w-full">
          <div className="flex touch-pan-y gap-4">
            {React.Children.map(children, (child) => {
              return (
                <div className="w-full md:max-w-[80%] flex-shrink-0">
                  {child}
                </div>
              )
            })}
          </div>
        </div>
        <ArrowButton
          direction="right"
          scroll={scrollNext}
          btnDisabled={nextBtnDisabled}
        />
      </div>
      <div className="flex justify-center max-lg:w-full max-lg:absolute max-lg:bottom-4">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className="px-1.5"
          >
            <span
              className={twMerge(
                "border-b border-transparent transition-colors pb-0.5 px-0.5",
                index === selectedIndex && "border-black"
              )}
            >
              {index + 1}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

type ArrowButtonOwnProps = {
  direction?: "left" | "right"
  scroll: () => void | undefined
  btnDisabled: boolean
}

export const ArrowButton: React.FC<
  ArrowButtonOwnProps & React.ComponentPropsWithoutRef<"button">
> = ({ direction = "left", scroll, btnDisabled, className, ...rest }) => (
  <button
    {...rest}
    type="button"
    onClick={scroll}
    disabled={btnDisabled}
    className={twMerge(
      "transition-opacity absolute z-10 max-lg:hidden",
      direction === "left" && "left-4",
      direction === "right" && "right-4 rotate-180",
      className
    )}
  >
    <IconCircle
      className={twJoin(
        "bg-black text-white transition-colors",
        btnDisabled && "bg-transparent text-black"
      )}
    >
      <Icon name="arrow-left" className="w-6 h-6" />
    </IconCircle>
  </button>
)
