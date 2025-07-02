import { useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import { artworkService } from '@/services/api/artworkService'

const ArtworkCard = ({ artwork, onClick, index = 0 }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(artwork.likes || 0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const rotationAngle = (index % 3 - 1) * 2 // Slight rotation for organic feel

  const handleLike = async (e) => {
    e.stopPropagation() // Prevent card click
    
    if (isAnimating) return
    
    setIsAnimating(true)
    
    // Optimistic update
    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1)
    
    try {
      await artworkService.toggleLike(artwork.Id)
      toast.success(newLikedState ? 'Artwork liked!' : 'Like removed', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
      })
    } catch (error) {
      // Revert on error
      setIsLiked(!newLikedState)
      setLikeCount(prev => newLikedState ? prev - 1 : prev + 1)
      toast.error('Failed to update like')
    } finally {
      setTimeout(() => setIsAnimating(false), 300)
    }
  }

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
          <motion.button
            onClick={handleLike}
            className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
            whileTap={{ scale: 0.9 }}
            disabled={isAnimating}
          >
            <motion.div
              animate={{
                scale: isAnimating ? [1, 1.3, 1] : 1,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
            >
              <ApperIcon 
                name={isLiked ? "HeartHandshake" : "Heart"} 
                className={`w-4 h-4 transition-colors duration-200 ${
                  isLiked ? 'text-red-500 fill-current' : ''
                }`}
              />
            </motion.div>
            <span className="text-sm">{likeCount}</span>
          </motion.button>
        </div>
        
        <p className="text-sm text-gray-600">
          {format(new Date(artwork.createdAt), 'MMM d, h:mm a')}
        </p>
      </div>
    </motion.div>
  )
}

export default ArtworkCard