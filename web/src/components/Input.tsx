import { forwardRef } from 'react'
import type { ComponentProps } from 'react'
import { WarningIcon } from '../libs/phosphor-icons'

interface InputProps extends ComponentProps<'input'> {
  label: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className, id, ...props },
  ref
) {
  const inputId = id || props.name || undefined

  const baseInputClasses = [
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
  ]

  const stateClasses = error
    ? [
        'text-blue-base',
        'ring-[1.5px]',
        'ring-danger',
      ]
    : [
        'focus:ring-[1.5px]',
        'focus:ring-blue-base',
      ]

  const classes = [
    ...baseInputClasses,
    ...stateClasses,
    className || '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <label className="inline-flex w-full flex-col gap-2">
      <span
        className={[
          'text-xs',
          error ? 'text-danger font-bold' : 'text-gray-500',
          !error ? 'group-focus:text-blue-base group-focus-within:font-bold' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {label}
      </span>

      <div className={['group', 'w-full'].join(' ')}>
        <input
          id={inputId}
          ref={ref}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={classes}
          {...props}
        />
      </div>

      {error ? (
        <div id={inputId ? `${inputId}-error` : undefined} className="mt-1 inline-flex items-start gap-1.5 text-gray-500">
          <WarningIcon size={16} className="shrink-0 text-danger" />
          <span className="text-sm">{error}</span>
        </div>
      ) : null}
    </label>
  )
})

export default Input
