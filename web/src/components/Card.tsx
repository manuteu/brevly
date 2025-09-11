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
  loading?: boolean
}

export default function Card({
  children,
  className,
  padding,
  loading = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn('relative', cardVariants({ padding }), className)}
      {...props}
    >
      {loading && (
        <>
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-3 overflow-hidden rounded-t-lg">
            <div className="absolute inset-0 h-1 bg-blue-base/20" />
            <div
              className="absolute top-0 h-1 w-1/3 bg-blue-base"
              style={{
                animation: 'brevly-loading-bar 1.2s ease-in-out infinite',
              }}
            />
          </div>
          <style>{`
@keyframes brevly-loading-bar {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(50%); }
  100% { transform: translateX(200%); }
}
`}</style>
        </>
      )}
      {children}
    </div>
  )
}
