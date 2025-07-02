import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ArtworkCard from '@/components/molecules/ArtworkCard'
import ArtworkModal from '@/components/organisms/ArtworkModal'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const ArtworkGallery = ({ artworks, loading, error, onRetry }) => {
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  if (loading) {
    return <Loading type="gallery" />
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />
  }

  if (!artworks || artworks.length === 0) {
    return (
      <Empty
        type="gallery"
        title="No artwork yet"
        description="Be the first to share your creative interpretation of today's prompt!"
        actionText="Start Drawing"
        onAction={() => window.location.href = '/draw'}
      />
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6"
      >
        {artworks.map((artwork, index) => (
          <ArtworkCard
            key={artwork.Id}
            artwork={artwork}
            index={index}
            onClick={setSelectedArtwork}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedArtwork && (
          <ArtworkModal
            artwork={selectedArtwork}
            onClose={() => setSelectedArtwork(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default ArtworkGallery