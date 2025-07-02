import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'btn inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus:ring-primary-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-600 hover:to-secondary-700 focus:ring-secondary-500 shadow-lg hover:shadow-xl',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 focus:ring-accent-500 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 focus:ring-primary-500',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl',
    xl: 'px-8 py-4 text-xl rounded-xl'
  }
  
  const disabledClasses = 'opacity-50 cursor-not-allowed'
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? disabledClasses : ''} ${className}`

  const handleClick = (e) => {
    if (disabled || loading) return
    onClick?.(e)
  }

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02, y: -1 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <ApperIcon name="Loader2" className="w-4 h-4" />
        </motion.div>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <ApperIcon name={icon} className="w-4 h-4" />
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <ApperIcon name={icon} className="w-4 h-4" />
      )}
    </motion.button>
  )
}

export default Button