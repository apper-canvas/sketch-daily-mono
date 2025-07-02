import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  type = 'default',
  title = "Nothing here yet",
  description = "Start creating something amazing!",
  actionText = "Get Started",
  onAction
}) => {
  const getIcon = () => {
    switch (type) {
      case 'gallery':
        return 'Image'
      case 'drawings':
        return 'Palette'
      default:
        return 'Sparkles'
    }
  }

  const getGradient = () => {
    switch (type) {
      case 'gallery':
        return 'from-accent-100 to-accent-200'
      case 'drawings':
        return 'from-secondary-100 to-secondary-200'
      default:
        return 'from-primary-100 to-primary-200'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <div className={`w-20 h-20 bg-gradient-to-br ${getGradient()} rounded-full flex items-center justify-center mb-6`}>
        <ApperIcon name={getIcon()} className="w-10 h-10 text-gray-600" />
      </div>
      
      <h3 className="text-xl font-display text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-sm leading-relaxed">
        {description}
      </p>
      
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="btn btn-primary px-6 py-3 text-lg font-medium shadow-lg"
        >
          {actionText}
        </motion.button>
      )}
    </motion.div>
  )
}

export default Empty