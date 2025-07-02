import { useState, useEffect } from 'react'
import ArtworkGallery from '@/components/organisms/ArtworkGallery'
import { artworkService } from '@/services/api/artworkService'
import { promptService } from '@/services/api/promptService'

const GalleryPage = () => {
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [prompt, setPrompt] = useState(null)

  useEffect(() => {
    loadGalleryData()
  }, [])

  const loadGalleryData = async () => {
    try {
      setError(null)
      setLoading(true)
      
      // Load today's prompt and artworks
      const [todaysPrompt, allArtworks] = await Promise.all([
        promptService.getTodaysPrompt(),
        artworkService.getAll()
      ])
      
      setPrompt(todaysPrompt)
      
      // Filter artworks for today's prompt
      const todaysArtworks = allArtworks.filter(
        artwork => artwork.promptId === todaysPrompt.Id
      )
      
      // Sort by creation date (newest first)
      todaysArtworks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      
      setArtworks(todaysArtworks)
    } catch (err) {
      setError('Failed to load gallery. Please try again.')
      console.error('Error loading gallery:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl lg:text-3xl font-display text-gray-900 mb-2">
            Today's Gallery
          </h1>
          {prompt && (
            <p className="text-gray-600 text-lg">
              "{prompt.text}"
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            {artworks.length} {artworks.length === 1 ? 'artwork' : 'artworks'} submitted
          </p>
        </div>
      </div>

      {/* Gallery */}
      <ArtworkGallery
        artworks={artworks}
        loading={loading}
        error={error}
        onRetry={loadGalleryData}
      />
    </div>
  )
}

export default GalleryPage