import mockArtworks from '@/services/mockData/artworks.json'

class ArtworkService {
  constructor() {
    this.artworks = [...mockArtworks]
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return [...this.artworks]
  }

  async getById(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return this.artworks.find(artwork => artwork.Id === id)
  }

  async getByPromptId(promptId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250))
    
    return this.artworks.filter(artwork => artwork.promptId === promptId)
  }

  async create(artworkData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const newId = Math.max(...this.artworks.map(a => a.Id), 0) + 1
    const newArtwork = {
      Id: newId,
      ...artworkData,
      createdAt: new Date().toISOString()
    }
    
    this.artworks.push(newArtwork)
    return newArtwork
  }

  async update(id, updateData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = this.artworks.findIndex(artwork => artwork.Id === id)
    if (index === -1) {
      throw new Error('Artwork not found')
    }
    
    this.artworks[index] = { ...this.artworks[index], ...updateData }
    return this.artworks[index]
  }

  async delete(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = this.artworks.findIndex(artwork => artwork.Id === id)
    if (index === -1) {
      throw new Error('Artwork not found')
    }
    
this.artworks.splice(index, 1)
    return true
  }

  async toggleLike(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // Validate id is integer
    if (!Number.isInteger(id)) {
      throw new Error('Invalid artwork ID')
    }
    
    const artwork = this.artworks.find(a => a.Id === id)
    if (!artwork) {
      throw new Error('Artwork not found')
    }
    
    // Toggle like count (simplified - in real app would track user likes)
    artwork.likes = (artwork.likes || 0) + (Math.random() > 0.5 ? 1 : -1)
    artwork.likes = Math.max(0, artwork.likes) // Prevent negative likes
    
    return artwork
  }
}

export const artworkService = new ArtworkService()