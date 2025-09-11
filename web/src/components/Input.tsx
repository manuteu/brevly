import { forwardRef } from 'react'
import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { WarningIcon } from '../libs/phosphor-icons'
import { cn } from '../utils/cn'

const inputVariants = cva(
  [
    'w-full',
    'max-h-[48px]',
    'px-4',
    'py-4',
    'text-base',
    'text-gray-600',
    'font-normal',
    'placeholder:text-gray-400',
    'bg-white',
    'rounded-lg',
    'outline-none',
    'transition-colors',
    'duration-200',
    'ring-inset',
    'caret-blue-base',
    'ring-1',
    'ring-gray-300',
  ],
  {
    variants: {
      state: {
        default: [
          'focus:ring-[1.5px]',
          'focus:ring-blue-base',
        ],
        error: [
          'text-blue-base',
          'ring-[1.5px]',
          'ring-danger',
        ],
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
)

const labelVariants = cva(
  'text-xs',
  {
    variants: {
      state: {
        default: [
          'text-gray-500',
          'group-focus:text-blue-base',
          'group-focus-within:font-bold',
        ],
        error: [
          'text-danger',
          'font-bold',
        ],
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
)

interface InputProps
  extends ComponentProps<'input'>,
  VariantProps<typeof inputVariants> {
  label: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className, id, ...props },
  ref
) {
  const inputId = id || props.name || undefined
  const inputState = error ? 'error' : 'default'

  return (
    <label className="inline-flex w-full flex-col gap-2">
      <span className={labelVariants({ state: inputState })}>
        {label}
      </span>

      <div className="group w-full">
        <input
          id={inputId}
          ref={ref}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(inputVariants({ state: inputState }), className)}
          {...props}
        />
      </div>

      {error ? (
        <div
          id={inputId ? `${inputId}-error` : undefined}
          className="mt-1 inline-flex items-start gap-1.5 text-gray-500"
        >
          <WarningIcon size={16} className="shrink-0 text-danger" />
          <span className="text-sm">{error}</span>
        </div>
      ) : null}
    </label>
  )
})

export default Input
