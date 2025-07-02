import { motion } from 'framer-motion'

const Loading = ({ type = 'default' }) => {
  if (type === 'gallery') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="bg-white rounded-xl shadow-card overflow-hidden"
          >
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
              <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse w-2/3" />
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === 'prompt') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-8 text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full mx-auto mb-4 animate-pulse" />
        <div className="space-y-3">
          <div className="h-8 bg-gradient-to-r from-primary-100 to-primary-200 rounded animate-pulse mx-auto w-3/4" />
          <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse mx-auto w-1/2" />
        </div>
      </motion.div>
    )
  }

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-3 border-primary-200 border-t-primary-500 rounded-full"
      />
    </div>
  )
}

export default Loading