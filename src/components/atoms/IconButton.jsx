import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const IconButton = ({ 
  icon, 
  variant = 'default',
  size = 'md',
  active = false,
  disabled = false,
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full'
  
  const variants = {
    default: `border-2 border-gray-200 hover:border-primary-500 ${active ? 'border-primary-500 bg-primary-50 text-primary-600' : 'text-gray-600 hover:text-primary-600'}`,
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-600 hover:to-secondary-700 shadow-lg',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
  }
  
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  }
  
  const disabledClasses = 'opacity-50 cursor-not-allowed'
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? disabledClasses : ''} ${className}`

  const handleClick = (e) => {
    if (disabled) return
    onClick?.(e)
  }

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      <ApperIcon name={icon} className={iconSizes[size]} />
    </motion.button>
  )
}

export default IconButton