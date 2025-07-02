export const createStroke = (tool, color, size, points = []) => ({
  tool,
  color,
  size,
  points: [...points]
})

export const createPoint = (x, y) => ({ x, y })

export const drawStrokeOnCanvas = (ctx, stroke) => {
  if (!stroke || stroke.points.length < 2) return

  ctx.beginPath()
  ctx.strokeStyle = stroke.color
  ctx.lineWidth = stroke.size
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.globalCompositeOperation = stroke.tool === 'eraser' ? 'destination-out' : 'source-over'

  const [firstPoint, ...restPoints] = stroke.points
  ctx.moveTo(firstPoint.x, firstPoint.y)
  
  restPoints.forEach(point => {
    ctx.lineTo(point.x, point.y)
  })
  
  ctx.stroke()
}

export const getPointFromEvent = (event, canvas) => {
  const rect = canvas.getBoundingClientRect()
  const clientX = event.type.includes('touch') ? event.touches[0].clientX : event.clientX
  const clientY = event.type.includes('touch') ? event.touches[0].clientY : event.clientY
  
  return createPoint(
    clientX - rect.left,
    clientY - rect.top
  )
}

export const canvasToDataURL = (canvas, type = 'image/png', quality = 0.8) => {
  return canvas.toDataURL(type, quality)
}

export const resizeCanvas = (canvas, width, height) => {
  const ctx = canvas.getContext('2d')
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  
  canvas.width = width
  canvas.height = height
  
  ctx.putImageData(imageData, 0, 0)
}