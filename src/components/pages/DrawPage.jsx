import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import PromptCard from '@/components/organisms/PromptCard'
import DrawingCanvas from '@/components/organisms/DrawingCanvas'
import UploadZone from '@/components/molecules/UploadZone'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { promptService } from '@/services/api/promptService'
import { artworkService } from '@/services/api/artworkService'

const DrawPage = () => {
  const [prompt, setPrompt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('draw')
  const [drawingData, setDrawingData] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [artistName, setArtistName] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadTodaysPrompt()
  }, [])

  const loadTodaysPrompt = async () => {
    try {
      setError(null)
      setLoading(true)
      const todaysPrompt = await promptService.getTodaysPrompt()
      setPrompt(todaysPrompt)
    } catch (err) {
      setError('Failed to load today\'s prompt. Please try again.')
      console.error('Error loading prompt:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!artistName.trim()) {
      toast.error('Please enter your artist name')
      return
    }

    if (activeTab === 'draw' && !drawingData) {
      toast.error('Please create a drawing first')
      return
    }

    if (activeTab === 'upload' && !uploadedFile) {
      toast.error('Please upload an image first')
      return
    }

    try {
      setSubmitting(true)

      // Create artwork data
      const artworkData = {
        promptId: prompt.Id,
        artistName: artistName.trim(),
        imageUrl: activeTab === 'draw' ? drawingData : URL.createObjectURL(uploadedFile),
        createdAt: new Date().toISOString(),
        likes: 0
      }

      await artworkService.create(artworkData)
      
      toast.success('Your artwork has been submitted successfully!')
      
      // Reset form
      setArtistName('')
      setDrawingData(null)
      setUploadedFile(null)
      
    } catch (err) {
      toast.error('Failed to submit artwork. Please try again.')
      console.error('Error submitting artwork:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-8">
        <Loading type="prompt" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        <Error message={error} onRetry={loadTodaysPrompt} />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-8">
      {/* Prompt */}
      <PromptCard prompt={prompt} />

      {/* Creation Tabs */}
      <div className="space-y-6">
        <div className="flex bg-gray-100 rounded-xl p-1">
          {[
            { id: 'draw', label: 'Draw', icon: 'Palette' },
            { id: 'upload', label: 'Upload', icon: 'Upload' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2"
              >
                <span>{tab.label}</span>
              </motion.div>
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'draw' ? (
            <DrawingCanvas onDrawingChange={setDrawingData} />
          ) : (
            <UploadZone onFileSelect={setUploadedFile} />
          )}
        </motion.div>
      </div>

      {/* Submission Form */}
      <div className="card p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Submit Your Artwork</h3>
        
        <Input
          label="Artist Name"
          placeholder="Enter your name or pseudonym"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
        
        <Button
          onClick={handleSubmit}
          loading={submitting}
          disabled={!artistName.trim() || (!drawingData && !uploadedFile)}
          className="w-full"
          size="lg"
        >
          Submit to Gallery
        </Button>
      </div>
    </div>
  )
}

export default DrawPage