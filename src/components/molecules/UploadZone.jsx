import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const UploadZone = ({ onFileSelect, className = '' }) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInput = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      onFileSelect(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const clearPreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    onFileSelect(null)
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {previewUrl ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative group"
          >
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-64 object-cover rounded-xl shadow-canvas"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-xl flex items-center justify-center">
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={clearPreview}
                className="bg-white bg-opacity-90 text-gray-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            className={`
              relative h-64 border-2 border-dashed rounded-xl cursor-pointer
              transition-all duration-200 flex flex-col items-center justify-center
              ${isDragOver 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
              }
            `}
          >
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                isDragOver ? 'bg-primary-100' : 'bg-gray-100'
              }`}>
                <ApperIcon 
                  name="Upload" 
                  className={`w-6 h-6 ${isDragOver ? 'text-primary-600' : 'text-gray-600'}`} 
                />
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                {isDragOver ? 'Drop your artwork here' : 'Upload your artwork'}
              </p>
              <p className="text-sm text-gray-600">
                Drag and drop an image, or click to browse
              </p>
              <p className="text-xs text-gray-500 mt-2">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UploadZone