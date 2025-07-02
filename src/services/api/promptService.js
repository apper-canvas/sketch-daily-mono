import { format } from 'date-fns'
import mockPrompts from '@/services/mockData/prompts.json'

class PromptService {
  async getTodaysPrompt() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const today = format(new Date(), 'yyyy-MM-dd')
    
    // Find prompt for today or get a random one
    let todaysPrompt = mockPrompts.find(prompt => 
      format(new Date(prompt.date), 'yyyy-MM-dd') === today
    )
    
    if (!todaysPrompt) {
      // If no prompt for today, use the first one but update its date
      todaysPrompt = { ...mockPrompts[0], date: today }
    }
    
    return todaysPrompt
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return [...mockPrompts]
  }

  async getById(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return mockPrompts.find(prompt => prompt.Id === id)
  }
}

export const promptService = new PromptService()