import { motion } from 'framer-motion'
import IconButton from '@/components/atoms/IconButton'

const DrawingToolbar = ({ 
  selectedTool, 
  onToolChange,
  selectedColor,
  onColorChange,
  brushSize,
  onBrushSizeChange,
  onUndo,
  onRedo,
  onClear,
  canUndo,
  canRedo
}) => {
  const tools = [
    { id: 'brush', icon: 'Brush' },
    { id: 'eraser', icon: 'Eraser' }
  ]

  const colors = [
    '#000000', '#FF6B6B', '#4ECDC4', '#45B7D1', 
    '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E9', '#82E0AA'
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-card">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Tools */}
        <div className="col-span-2 lg:col-span-1">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Tools</h3>
          <div className="flex gap-2">
            {tools.map((tool) => (
              <IconButton
                key={tool.id}
                icon={tool.icon}
                active={selectedTool === tool.id}
                onClick={() => onToolChange(tool.id)}
                variant="default"
              />
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="col-span-2 lg:col-span-2">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Colors</h3>
          <div className="grid grid-cols-6 gap-1">
            {colors.map((color) => (
              <motion.button
                key={color}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onColorChange(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === color 
                    ? 'border-gray-800 shadow-lg scale-110' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Brush Size */}
        <div className="col-span-2 lg:col-span-1">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Size</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">S</span>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => onBrushSizeChange(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-gray-500">L</span>
          </div>
          <div className="mt-2 flex justify-center">
            <div
              className="bg-gray-800 rounded-full"
              style={{ 
                width: `${Math.max(brushSize / 2, 4)}px`, 
                height: `${Math.max(brushSize / 2, 4)}px` 
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="col-span-2 lg:col-span-2">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Actions</h3>
          <div className="flex gap-2">
            <IconButton
              icon="Undo"
              onClick={onUndo}
              disabled={!canUndo}
              variant="ghost"
            />
            <IconButton
              icon="Redo"
              onClick={onRedo}
              disabled={!canRedo}
              variant="ghost"
            />
            <IconButton
              icon="Trash2"
              onClick={onClear}
              variant="ghost"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrawingToolbar