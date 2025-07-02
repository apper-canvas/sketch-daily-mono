import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import IconButton from '@/components/atoms/IconButton'

const ArtworkModal = ({ artwork, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm" />
      
      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Close button */}
        <div className="absolute top-4 right-4 z-10">
          <IconButton
            icon="X"
            onClick={onClose}
            variant="ghost"
            className="bg-white bg-opacity-90 hover:bg-opacity-100"
          />
        </div>
        
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="flex-1 bg-gray-100">
            <img
              src={artwork.imageUrl}
              alt={`Artwork by ${artwork.artistName}`}
              className="w-full h-64 lg:h-96 object-cover"
            />
          </div>
          
          {/* Info */}
          <div className="lg:w-80 p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-display text-gray-900 mb-2">
                {artwork.artistName}
              </h2>
              <p className="text-gray-600">
                {format(new Date(artwork.createdAt), 'MMMM d, yyyy • h:mm a')}
              </p>
            </div>
            
            <div className="flex items-center justify-between py-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <ApperIcon name="Heart" className="w-5 h-5 text-red-500" />
                <span className="font-medium">{artwork.likes} likes</span>
              </div>
              
              <div className="flex items-center gap-2">
                <IconButton
                  icon="Heart"
                  variant="ghost"
                  className="text-red-500 hover:bg-red-50"
                />
                <IconButton
                  icon="Share"
                  variant="ghost"
                  className="text-gray-600"
                />
              </div>
            </div>
            
            {artwork.prompt && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Today's Prompt</h3>
                <p className="text-gray-700">{artwork.prompt}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ArtworkModal