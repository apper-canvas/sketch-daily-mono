import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'

const Header = () => {
  const today = new Date()
  
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <ApperIcon name="Palette" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-display text-gray-900">Sketch Daily</h1>
            <p className="text-sm text-gray-600">{format(today, 'EEEE, MMMM d, yyyy')}</p>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-2 text-sm text-gray-600">
          <ApperIcon name="Calendar" className="w-4 h-4" />
          <span>Day {format(today, 'DDD')}</span>
        </div>
      </div>
    </header>
  )
}

export default Header