import { useState, useCallback } from 'react'

export const useDrawing = () => {
  const [strokes, setStrokes] = useState([])
  const [redoStack, setRedoStack] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)

  const addStroke = useCallback((stroke) => {
    setStrokes(prev => [...prev, stroke])
    setRedoStack([]) // Clear redo stack when new action is performed
  }, [])

  const updateLastStroke = useCallback((point) => {
    setStrokes(prev => {
      if (prev.length === 0) return prev
      const newStrokes = [...prev]
      const lastStroke = newStrokes[newStrokes.length - 1]
      lastStroke.points.push(point)
      return newStrokes
    })
  }, [])

  const undo = useCallback(() => {
    if (strokes.length === 0) return false
    
    const lastStroke = strokes[strokes.length - 1]
    setRedoStack(prev => [...prev, lastStroke])
    setStrokes(prev => prev.slice(0, -1))
    return true
  }, [strokes])

  const redo = useCallback(() => {
    if (redoStack.length === 0) return false
    
    const strokeToRestore = redoStack[redoStack.length - 1]
    setRedoStack(prev => prev.slice(0, -1))
    setStrokes(prev => [...prev, strokeToRestore])
    return true
  }, [redoStack])

  const clear = useCallback(() => {
    setStrokes([])
    setRedoStack([])
  }, [])

  const canUndo = strokes.length > 0
  const canRedo = redoStack.length > 0

  return {
    strokes,
    isDrawing,
    setIsDrawing,
    addStroke,
    updateLastStroke,
    undo,
    redo,
    clear,
    canUndo,
    canRedo
  }
}