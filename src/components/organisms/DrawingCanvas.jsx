import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import DrawingToolbar from '@/components/molecules/DrawingToolbar'

const DrawingCanvas = ({ onDrawingChange }) => {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [selectedTool, setSelectedTool] = useState('brush')
  const [selectedColor, setSelectedColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)
  const [strokes, setStrokes] = useState([])
  const [redoStack, setRedoStack] = useState([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Redraw all strokes
    strokes.forEach(stroke => {
      drawStroke(ctx, stroke)
    })
  }, [strokes])

  const drawStroke = (ctx, stroke) => {
    if (stroke.points.length < 2) return

    ctx.beginPath()
    ctx.strokeStyle = stroke.color
    ctx.lineWidth = stroke.size
    ctx.globalCompositeOperation = stroke.tool === 'eraser' ? 'destination-out' : 'source-over'

    ctx.moveTo(stroke.points[0].x, stroke.points[0].y)
    
    for (let i = 1; i < stroke.points.length; i++) {
      const point = stroke.points[i]
      ctx.lineTo(point.x, point.y)
    }
    
    ctx.stroke()
  }

  const getPointFromEvent = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    }
  }

  const startDrawing = (e) => {
    e.preventDefault()
    setIsDrawing(true)
    setRedoStack([]) // Clear redo stack when new stroke starts
    
    const point = getPointFromEvent(e)
    const newStroke = {
      tool: selectedTool,
      color: selectedColor,
      size: brushSize,
      points: [point]
    }
    
    setStrokes(prev => [...prev, newStroke])
  }

  const draw = (e) => {
    if (!isDrawing) return
    e.preventDefault()
    
    const point = getPointFromEvent(e)
    
    setStrokes(prev => {
      const newStrokes = [...prev]
      const currentStroke = newStrokes[newStrokes.length - 1]
      currentStroke.points.push(point)
      return newStrokes
    })
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      onDrawingChange?.(canvasRef.current?.toDataURL())
    }
  }

  const undo = () => {
    if (strokes.length === 0) return
    
    const lastStroke = strokes[strokes.length - 1]
    setRedoStack(prev => [...prev, lastStroke])
    setStrokes(prev => prev.slice(0, -1))
  }

  const redo = () => {
    if (redoStack.length === 0) return
    
    const strokeToRestore = redoStack[redoStack.length - 1]
    setRedoStack(prev => prev.slice(0, -1))
    setStrokes(prev => [...prev, strokeToRestore])
  }

  const clearCanvas = () => {
    setStrokes([])
    setRedoStack([])
    onDrawingChange?.(null)
  }

  return (
    <div className="space-y-4">
      <DrawingToolbar
        selectedTool={selectedTool}
        onToolChange={setSelectedTool}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
        brushSize={brushSize}
        onBrushSizeChange={setBrushSize}
        onUndo={undo}
        onRedo={redo}
        onClear={clearCanvas}
        canUndo={strokes.length > 0}
        canRedo={redoStack.length > 0}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-canvas border-2 border-gray-100 overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-80 lg:h-96 cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </motion.div>
    </div>
  )
}

export default DrawingCanvas