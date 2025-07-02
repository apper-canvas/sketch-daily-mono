import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'

const ArtworkCard = ({ artwork, onClick, index = 0 }) => {
  const rotationAngle = (index % 3 - 1) * 2 // Slight rotation for organic feel

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 0 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotate: rotationAngle,
        transition: { delay: index * 0.1 }
      }}
      whileHover={{ 
        scale: 1.05, 
        rotate: 0,
        y: -8,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(artwork)}
      className="bg-white rounded-xl shadow-card overflow-hidden cursor-pointer group"
      style={{ transformOrigin: 'center center' }}
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={artwork.imageUrl}
          alt={`Artwork by ${artwork.artistName}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-900 truncate">
            {artwork.artistName}
          </h3>
          <div className="flex items-center gap-1 text-gray-500">
            <ApperIcon name="Heart" className="w-4 h-4" />
            <span className="text-sm">{artwork.likes}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600">
          {format(new Date(artwork.createdAt), 'MMM d, h:mm a')}
        </p>
      </div>
    </motion.div>
  )
}

export default ArtworkCard