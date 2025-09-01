import type { ComponentProps, ComponentType } from 'react'
import * as Icons from '../libs/phosphor-icons'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary'
  label?: string
  icon?: keyof typeof Icons
}

export default function Button({
  variant = 'primary',
  className,
  children,
  label,
  icon,
  ...props
}: ButtonProps) {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'cursor-pointer',
    'transition-colors',
    'duration-300',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ]

  const variantClasses: Record<NonNullable<ButtonProps['variant']>, string[]> = {
    primary: [
      'w-full',
      'max-w-[352px]',
      'p-4',
      'bg-blue-base',
      'text-white',
      'text-base',
      'rounded-lg',
      'hover:bg-blue-dark',
      'disabled:bg-blue-base/50',
    ],
    secondary: [
      'p-2', // 8px
      'flex-row',
      'gap-1.5', // 6px
      'rounded', // 4px
      'bg-gray-200',
      'text-sm',
      'font-semibold', // semi-bold
      'text-gray-500',
      'border',
      'border-transparent',
      'hover:border-blue-base',
      'focus:border-blue-base',
    ],
  }

  const classes = [
    ...baseClasses,
    ...variantClasses[variant],
    className || '',
  ]
    .filter(Boolean)
    .join(' ')

  const content = label ?? children

  const IconComponent: ComponentType<{ size?: number; className?: string }> | null =
    variant === 'secondary' && icon && icon in Icons
      ? (Icons as Record<string, ComponentType<{ size?: number; className?: string }>>)[icon]
      : null

  const ariaLabel = typeof content === 'string' ? content : undefined

  return (
    <button className={classes} aria-label={ariaLabel} {...props}>
      {IconComponent ? <IconComponent size={16} className="shrink-0" /> : null}
      {typeof content === 'string' ? <span>{content}</span> : content}
    </button>
  )
}
