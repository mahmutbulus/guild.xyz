import { cn } from "@/lib/utils"
import { ArrowSquareOut } from "@phosphor-icons/react/ArrowSquareOut"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import Link from "next/link"
import * as React from "react"

const anchorVariants = cva(
  "underline-offset-4 focus:ring-ring focus-visible:ring-4 outline-none font-medium",
  {
    variants: {
      variant: {
        default: "text-foreground hover:underline",
        highlighted: "text-anchor-foreground hover:underline",
        muted: "text-muted-foreground hover:underline",
        silent: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AnchorProps
  extends React.ComponentProps<typeof Link>,
    VariantProps<typeof anchorVariants> {
  asChild?: boolean
  showExternal?: boolean
}

const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  (
    {
      className,
      variant,
      asChild = false,
      showExternal = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : Link

    return (
      <Comp
        className={cn(
          anchorVariants({ variant }),
          showExternal && "inline-flex items-center gap-1",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        {showExternal && <ArrowSquareOut />}
      </Comp>
    )
  }
)
Anchor.displayName = "Anchor"

export { Anchor, anchorVariants }
