export const createImageFromFile = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Invalid file type'))
      return
    }

    const reader = new FileReader()
    
    reader.onload = (event) => {
      const img = new Image()
      
      img.onload = () => {
        resolve({
          image: img,
          url: event.target.result,
          width: img.width,
          height: img.height,
          aspectRatio: img.width / img.height
        })
      }
      
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = event.target.result
    }
    
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

export const resizeImage = (imageData, maxWidth = 800, maxHeight = 600, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    const { image, aspectRatio } = imageData
    
    // Calculate new dimensions
    let { width, height } = image
    
    if (width > maxWidth) {
      width = maxWidth
      height = width / aspectRatio
    }
    
    if (height > maxHeight) {
      height = maxHeight
      width = height * aspectRatio
    }
    
    canvas.width = width
    canvas.height = height
    
    // Draw resized image
    ctx.drawImage(image, 0, 0, width, height)
    
    // Convert to data URL
    const dataURL = canvas.toDataURL('image/jpeg', quality)
    
    resolve({
      dataURL,
      width,
      height,
      aspectRatio: width / height
    })
  })
}

export const validateImageFile = (file, maxSize = 10 * 1024 * 1024) => { // 10MB default
  const errors = []
  
  if (!file) {
    errors.push('No file selected')
    return { isValid: false, errors }
  }
  
  if (!file.type.startsWith('image/')) {
    errors.push('File must be an image')
  }
  
  if (file.size > maxSize) {
    errors.push(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`)
  }
  
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    errors.push('File type not supported. Please use JPG, PNG, GIF, or WebP')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}