import { forwardRef } from 'react'

const Input = forwardRef(({ 
  label, 
  error, 
  helperText,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <input
        ref={ref}
        className={`
          w-full px-4 py-3 border border-gray-300 rounded-lg
          focus:ring-2 focus:ring-primary-500 focus:border-transparent
          transition-all duration-200
          placeholder-gray-500
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input