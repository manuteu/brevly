import type { ComponentProps, ComponentType } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import * as Icons from '../libs/phosphor-icons'
import { cn } from '../utils/cn'

const buttonVariants = cva(
  [
    'flex',
    'items-center',
    'justify-center',
    'cursor-pointer',
    'transition-colors',
    'duration-300',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: [
          'w-full',
          'p-[15px]',
          'bg-blue-base',
          'text-white',
          'text-base',
          'rounded-lg',
          'hover:bg-blue-dark',
          'disabled:bg-blue-base/50',
        ],
        secondary: [
          'p-[7px]',
          'flex-row',
          'gap-1.5',
          'rounded',
          'bg-gray-200',
          'text-sm',
          'font-semibold',
          'text-gray-500',
          'border',
          'border-transparent',
          'hover:border-blue-base',
          'focus:border-blue-base',
        ],
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

interface ButtonProps
  extends ComponentProps<'button'>,
  VariantProps<typeof buttonVariants> {
  label?: string
  icon?: keyof typeof Icons
}

export default function Button({
  variant,
  className,
  children,
  label,
  icon,
  ...props
}: ButtonProps) {
  const content = label ?? children

  const IconComponent: ComponentType<{ size?: number; className?: string }> | null =
    variant === 'secondary' && icon && icon in Icons
      ? (Icons as Record<string, ComponentType<{ size?: number; className?: string }>>)[icon]
      : null

  const ariaLabel = typeof content === 'string' ? content : undefined

  return (
    <button
      className={cn(buttonVariants({ variant }), className)}
      aria-label={ariaLabel}
      {...props}
    >
      {IconComponent ? <IconComponent size={16} className="shrink-0" /> : null}
      {typeof content === 'string' ? <span>{content}</span> : content}
    </button>
  )
}
