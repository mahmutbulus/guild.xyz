"use client"

import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselDotButton,
  CarouselItem,
  useCarouselDotButton,
} from "@/components/ui/Carousel"
import { Separator } from "@/components/ui/Separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/Tooltip"
import { cn } from "@/lib/utils"
import { ArrowLeft, Info } from "@phosphor-icons/react"
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useRef, useState } from "react"
import { Benefits } from "./Benefits"
import { GuildPassScene } from "./GuildPassScene"

interface Subscription {
  title: string
  pricing: string
  description: string
}

const SUBSCRIPTIONS = [
  {
    title: "Single Pass",
    pricing: "$6 / month",
    description: "For the curious, who want to try Guild’s new features",
  },
  {
    title: "Bundle Pass",
    pricing: "$60 / year",
    description: "For the professionals, who would benefit from Guild continuously",
  },
  {
    title: "Lifetime Pass",
    pricing: "0.1 ETH one time",
    description:
      "For Guild’s biggest supporters, who are excited for the future of Guild",
  },
] as const satisfies Subscription[]

export const GuildPassPicker = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState<number>()
  const didUserSelect = activeIndex !== undefined
  const { selectedIndex, scrollSnaps, onCarouselDotButtonClick } =
    useCarouselDotButton(api)
  const carouselPlugins = useRef([
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ])

  useEffect(() => {
    if (!api || activeIndex === undefined) {
      return
    }
    api.scrollTo(activeIndex)
  }, [api, activeIndex])

  return (
    <Card
      className={cn(
        "mx-auto flex max-w-3lg flex-col bg-gradient-to-b from-card to-card-secondary",
        didUserSelect && "max-w-sm"
      )}
    >
      <div className="mt-8 mb-14 px-8">
        {activeIndex !== undefined ? (
          <Button
            onClick={() => setActiveIndex(undefined)}
            className="h-10 pl-0"
            size="lg"
            variant="unstyled"
          >
            <ArrowLeft />
            Purchase Pass
          </Button>
        ) : (
          <h1 className="h-10 text-center font-bold text-2xl leading-none tracking-tighter">
            Choose your pass
          </h1>
        )}
      </div>
      <Carousel
        className="cursor-pointer active:cursor-grabbing"
        setApi={setApi}
        plugins={carouselPlugins.current}
      >
        <CarouselContent className="md:-ml-0 md:justify-center">
          {SUBSCRIPTIONS.map(({ title, description, pricing }, i) => (
            <CarouselItem
              className={
                "select-none from-accent hover:bg-gradient-to-t md:basis-1/3 md:pl-0"
              }
              key={title}
              onClick={() => setActiveIndex(i)}
            >
              <article className="relative flex h-full flex-col items-center pb-6 text-center">
                <div className="h-48 w-full">
                  <GuildPassScene />
                </div>
                <div className="px-4">
                  <h2
                    className={cn("font-extrabold text-lg", {
                      "text-purple-500": i === activeIndex,
                    })}
                  >
                    {title}
                  </h2>
                  <strong className="font-extrabold text-lg text-orange-500">
                    {pricing}
                  </strong>
                  <p className="max-w-xs text-balance pt-2 text-muted-foreground text-sm">
                    {description}
                  </p>
                  <Button colorScheme="primary" className="mt-6 w-full md:hidden">
                    Purchase
                  </Button>
                </div>
                {i < SUBSCRIPTIONS.length - 1 && (
                  <Separator
                    orientation="vertical"
                    className="absolute right-0 hidden bg-[none] bg-gradient-to-t from-border to-60% md:block"
                  />
                )}
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mb-4 space-x-3 self-center md:hidden">
        {scrollSnaps.map((_, i) => (
          <CarouselDotButton
            key={i}
            onClick={() => onCarouselDotButtonClick(i)}
            isActive={i === selectedIndex}
          />
        ))}
      </div>
      <div className="space-y-4 border-border border-t-2 bg-muted p-8">
        {didUserSelect ? (
          <div className="space-y-4 font-semibold">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                1. Verification
                <Tooltip>
                  <TooltipTrigger>
                    <Info weight="bold" />
                  </TooltipTrigger>
                  <TooltipContent>
                    We have to collect your personal details for legal reasons. They
                    won’t be shared anywhere on the website
                  </TooltipContent>
                </Tooltip>
              </div>
              <Button colorScheme="primary">Start</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              2. Complete payment
              <Button colorScheme="primary" disabled>
                Go to stripe
              </Button>
            </div>
          </div>
        ) : (
          <Benefits />
        )}
      </div>
    </Card>
  )
}
