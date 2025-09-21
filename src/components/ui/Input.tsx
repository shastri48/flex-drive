import { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export default function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}: InputProps) {
  const baseClasses =
    'block w-full border border-gray-300 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed'

  const paddingClasses =
    leftIcon && rightIcon
      ? 'pl-10 pr-10 py-2'
      : leftIcon
        ? 'pl-10 pr-3 py-2'
        : rightIcon
          ? 'pl-3 pr-10 py-2'
          : 'px-3 py-2'

  const errorClasses = error
    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
    : ''

  const inputClasses = `${baseClasses} ${paddingClasses} ${errorClasses} ${className}`

  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input id={inputId} className={inputClasses} {...props} />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
