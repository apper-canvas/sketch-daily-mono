import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'

const PromptCard = ({ prompt, loading = false }) => {
  if (loading || !prompt) {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full mx-auto mb-4 animate-pulse" />
        <div className="space-y-3">
          <div className="h-8 bg-gradient-to-r from-primary-100 to-primary-200 rounded animate-pulse mx-auto w-3/4" />
          <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse mx-auto w-1/2" />
        </div>
      </div>
    )
  }

  const getCategoryIcon = (category) => {
    const icons = {
      'nature': 'Leaf',
      'portrait': 'User',
      'abstract': 'Zap',
      'still-life': 'Coffee',
      'landscape': 'Mountain',
      'animal': 'Heart',
      'fantasy': 'Sparkles',
      'architecture': 'Building'
    }
    return icons[category?.toLowerCase()] || 'Palette'
  }

  const getCategoryColor = (category) => {
    const colors = {
      'nature': 'from-green-400 to-green-600',
      'portrait': 'from-blue-400 to-blue-600',
      'abstract': 'from-purple-400 to-purple-600',
      'still-life': 'from-orange-400 to-orange-600',
      'landscape': 'from-teal-400 to-teal-600',
      'animal': 'from-pink-400 to-pink-600',
      'fantasy': 'from-indigo-400 to-indigo-600',
      'architecture': 'from-gray-400 to-gray-600'
    }
    return colors[category?.toLowerCase()] || 'from-primary-400 to-primary-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="card p-8 text-center relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50 opacity-30" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`w-20 h-20 bg-gradient-to-br ${getCategoryColor(prompt.category)} rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg`}
        >
          <ApperIcon 
            name={getCategoryIcon(prompt.category)} 
            className="w-10 h-10 text-white" 
          />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl lg:text-3xl font-display text-gray-900 mb-4 leading-tight"
        >
          {prompt.text}
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-4 text-sm text-gray-600"
        >
          <div className="flex items-center gap-1">
            <ApperIcon name="Calendar" className="w-4 h-4" />
            <span>{format(new Date(prompt.date), 'MMMM d, yyyy')}</span>
          </div>
          
          {prompt.category && (
            <div className="flex items-center gap-1">
              <ApperIcon name="Tag" className="w-4 h-4" />
              <span className="capitalize">{prompt.category}</span>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default PromptCard