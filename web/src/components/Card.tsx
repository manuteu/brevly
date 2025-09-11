import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const cardVariants = cva(
  'bg-white rounded-lg',
  {
    variants: {
      padding: {
        default: 'md:p-8 p-6',
        sm: 'p-4',
        lg: 'md:p-10 p-8',
        none: 'p-0',
      },
    },
    defaultVariants: {
      padding: 'default',
    },
  }
)

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> {
  children: React.ReactNode
}

export default function Card({
  children,
  className,
  padding,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ padding }), className)}
      {...props}
    >
      {children}
    </div>
  )
}
