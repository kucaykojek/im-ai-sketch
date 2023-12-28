import { PATH_KEY, SELECTED_KEYS, SELECTED_VALUES } from './data/constants'
import { FreehandTools, ShapeTools } from './data/enums'
import { SketchDrawerOptions } from './data/types'

class SketchDrawerHandler {
  #canvas = document.createElement('canvas')
  #ctx = this.#canvas.getContext('2d')
  container?: HTMLElement

  #CONSTANTS = {
    DATA_KEY: PATH_KEY,
    TOOL_KEY: SELECTED_KEYS.tool,
    COLOR_KEY: SELECTED_KEYS.color
  }

  #isDrawing = false
  #paths: any[] = []
  #rzTimeout?: NodeJS.Timeout | null
  #redo: any[] = []

  #opts: SketchDrawerOptions = {
    width: 600,
    height: 600,
    bg: '#ffffff',
    color: '#000000',
    brushSize: 2,
    logs: false,
    lineCap: 'round',
    lineJoin: 'round',
    overflow: 'hidden',
    autosave: true
  }

  brushType = FreehandTools.Pencil

  constructor(element: string, opts: SketchDrawerOptions) {
    this.#opts = { ...this.#opts, ...opts }

    this.#initializeContainer(element)
    this.#initializeOptions()
    this.#initializeCanvas()
    this.#initializeTool()
    this.drawFromSaved()
    this.#canvas.addEventListener('mousedown', this.#handleStart)
    this.#canvas.addEventListener('mousemove', this.#handleMove)
    document.addEventListener('mouseup', this.#handleEnd)

    this.#canvas.addEventListener('touchstart', this.#handleStart)
    this.#canvas.addEventListener('touchmove', this.#handleMove)
    document.addEventListener('touchend', this.#handleEnd)

    document.addEventListener('keydown', this.#handleKeypress)

    window.addEventListener('resize', this.#handleResize)
    this.#log('Events initialized')
  }

  #handleKeypress = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.code === 'KeyZ') {
      this.undo()
    }
    if (e.ctrlKey && e.code === 'KeyY') {
      this.redo()
    }
    if (e.ctrlKey && e.code === 'KeyS') {
      e.preventDefault()
      this.save()
    }

    if (e.ctrlKey && e.code === 'KeyE') {
      e.preventDefault()
      this.download()
    }
  }

  #getBrush() {
    const brushProps = {
      [FreehandTools.Pencil]: {
        color:
          localStorage.getItem(SELECTED_KEYS.color) ||
          this.brushColor ||
          this.#opts.color,
        lineCap: 'round',
        lineJoin: 'round'
      },
      [FreehandTools.Highlighter]: {
        color:
          localStorage.getItem(SELECTED_KEYS.color) ||
          this.brushColor ||
          this.#opts.color,
        lineCap: 'butt',
        lineJoin: 'round',
        brushSize: 20
      },
      [FreehandTools.Eraser]: {
        color: this.#opts.bg,
        lineCap: 'round',
        lineJoin: 'round',
        brushSize: 10
      }
    }

    return {
      bg: this.#opts.bg,
      brushSize: this.#opts.brushSize,
      ...brushProps[
        (localStorage.getItem(SELECTED_KEYS.tool) ||
          SELECTED_VALUES.tool) as FreehandTools
      ]
    }
  }

  #handleStart = (e: MouseEvent | TouchEvent) => {
    e.preventDefault()

    if (e instanceof MouseEvent) {
      if (e.button == 0) {
        this.#log('Drawing Started')
        this.#isDrawing = true
        this.#paths.push([[...this.#coordinates(e), this.#getBrush()]])
        this.#draw()
      }
    }

    if (e instanceof TouchEvent) {
      if (e.touches) {
        this.#log('Drawing Started', this.#opts)
        this.#isDrawing = true
        this.#paths.push([[...this.#coordinates(e), this.#getBrush()]])
        this.#draw()
      }
    }
  }

  #handleMove = (e: MouseEvent | TouchEvent) => {
    e.preventDefault()
    const coords = this.#coordinates(e)
    if (this.#isDrawing) {
      this.#paths[this.#paths.length - 1].push(coords)
      this.#draw()
    }
  }

  #handleEnd = () => {
    if (this.#isDrawing) {
      this.#log('Drawing End')
      if (this.#opts.autosave) {
        this.save()
        this.#log('Auto Saved')
      }
    }
    this.#isDrawing = false
  }

  #handleResize = () => {
    if (this.#rzTimeout) {
      window.clearTimeout(this.#rzTimeout)
      this.#rzTimeout = null
    }
    this.#rzTimeout = setTimeout(() => {
      const { width: elWidth, height: elHeight } =
        this.container?.getBoundingClientRect() as DOMRect

      this.#opts.width = elWidth
      this.#opts.height = elHeight

      this.#initializeCanvasSize()
      this.#draw()
    }, 200)
  }

  #initializeContainer(element: any) {
    this.container = document.body

    if (element) {
      if (typeof element === 'string') {
        this.container = document.querySelector(element) as HTMLElement
        if (!this.container) {
          throw new Error('Element not found. Please check your selector.')
        }
      } else if (element.tagName) {
        this.container = element
      } else {
        console.error('Invalid element')
      }
    }
    this.container!.style.overflow = this.#opts.overflow!
    this.#log('Container Initialized')
  }

  #initializeOptions() {
    const { width: elWidth, height: elHeight } =
      this.container!.getBoundingClientRect() as DOMRect
    this.#opts.width = elWidth
    this.#opts.height = elHeight
  }

  #initializeCanvas() {
    this.#initializeCanvasSize()
    this.#canvas.style.background = this.#opts.bg!
    this.container!.appendChild(this.#canvas)
    this.#log('Canvas initialized')
  }

  #initializeCanvasSize() {
    this.#canvas.width = this.#opts.width!
    this.#canvas.height = this.#opts.height!
  }

  #initializeTool() {
    this.pencil()
  }

  #coordinates(e: any) {
    const { left: canvasLeft, top: canvasTop } =
      this.#canvas.getBoundingClientRect()

    if (e.touches && e.touches.length > 0) {
      return [
        e.touches[0].clientX - canvasLeft,
        e.touches[0].clientY - canvasTop
      ]
    }

    return [e.clientX - canvasLeft, e.clientY - canvasTop]
  }

  #draw() {
    this.clearOnlyScreen()
    this.#drawPath()
  }

  #drawPath() {
    for (let i = 0; i < this.#paths.length; i++) {
      const line = this.#paths[i]
      const startPath = line[0]
      this.#ctx!.lineWidth = startPath[2].brushSize
      this.#ctx!.strokeStyle = startPath[2].color
      this.#ctx?.beginPath()
      this.#ctx?.moveTo(startPath[0], startPath[1])
      for (let j = 0; j < line.length; j++) {
        this.#ctx?.lineTo(line[j][0], line[j][1])
      }
      this.#ctx!.lineCap = startPath[2].lineCap
      this.#ctx!.lineJoin = startPath[2].lineJoin
      this.#ctx?.stroke()
    }
  }

  #log(message: any, opts?: any) {
    const o = {
      icon: true,
      color: '#0cc0e4',
      disableColor: false,
      logs: this.#opts.logs,
      ...opts
    }

    if (o.logs) {
      if (typeof message !== 'string') {
        console.info(message)
        return
      }
      if (o.icon) {
        message = `ⓘ ${message}`
      }
      if (!o.disableColor) {
        message = `%c${message}`
      }
      console.info(message, `color: ${o.color}`)
    }
  }

  log = (message: any) => {
    return this.#log(message, { color: 'yellow', logs: true })
  }

  set bg(color: any) {
    this.#opts.bg = color
    this.#canvas.style.background = this.#opts.bg!
  }

  set brushSize(size) {
    this.#opts.brushSize = size
  }

  get brushSize() {
    return this.#opts.brushSize
  }

  set brushColor(color) {
    if (this.brushType == FreehandTools.Highlighter) {
      this.#opts.color = color + '55'
      this.saveColor(color!)
      return
    }
    if (this.brushType == FreehandTools.Eraser) {
      this.#opts.color = color
      // this.saveColor(color!)
      return
    }

    this.#opts.color = color
    this.saveColor(color!)
  }

  get brushColor() {
    return this.#opts.color
  }

  get ctx() {
    return this.#ctx
  }

  get canvas() {
    return this.#canvas
  }

  pencil = () => {
    this.brushType = FreehandTools.Pencil
    this.#opts.lineCap = 'round'
    this.#opts.lineJoin = 'round'
    this.saveTool(FreehandTools.Pencil)
  }

  highlighter = (size = 60) => {
    this.brushType = FreehandTools.Highlighter
    this.brushSize = size
    this.#opts.lineCap = 'butt'
    this.#opts.lineJoin = 'round'
    this.saveTool(FreehandTools.Highlighter)
  }

  eraser = () => {
    this.brushType = FreehandTools.Eraser
    this.brushColor = this.#opts.bg
    this.#opts.lineCap = 'round'
    this.#opts.lineJoin = 'round'
    this.brushSize = 50
    this.saveTool(FreehandTools.Eraser)
  }

  redraw = () => {
    this.#draw()
    this.#log('Redraw called')
  }

  clearOnlyScreen = () => {
    this.#ctx?.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
  }

  clear = () => {
    this.clearOnlyScreen()
    this.#paths = []
    this.clearSaved()
    this.#isDrawing = false
    this.#log('Cleared')
  }

  undo = () => {
    if (this.#paths.length > 0) {
      this.#redo.push({
        type: 'path',
        data: this.#paths[this.#paths.length - 1]
      })
      this.#paths.pop()
      this.redraw()
      this.#log('Undo Called')
    }
  }

  redo = () => {
    const redoObj = this.#redo[this.#redo.length - 1]
    if (redoObj && redoObj.type == 'path') {
      this.#paths.push(redoObj.data)
      this.redraw()
      this.#redo.pop()
      this.#log('Redo Called')
    }
  }

  save = () => {
    localStorage.removeItem(this.#CONSTANTS.DATA_KEY)
    localStorage.setItem(this.#CONSTANTS.DATA_KEY, JSON.stringify(this.#paths))
    if (!this.#opts.autosave) {
      this.#log('Saved!')
    }
  }

  saveTool = (tool: FreehandTools | ShapeTools) => {
    localStorage.removeItem(this.#CONSTANTS.TOOL_KEY)
    localStorage.setItem(this.#CONSTANTS.TOOL_KEY, tool)
  }

  saveColor = (color: string) => {
    localStorage.removeItem(this.#CONSTANTS.COLOR_KEY)
    localStorage.setItem(this.#CONSTANTS.COLOR_KEY, color)
  }

  clearSaved = () => {
    localStorage.removeItem(this.#CONSTANTS.DATA_KEY)
    this.#log('Saved cleared')
  }

  drawFromSaved = () => {
    const paths = localStorage.getItem(this.#CONSTANTS.DATA_KEY)
    if (paths) {
      this.#paths = JSON.parse(paths)
      this.redraw()
    }
    this.#log('Redrawn from save')
  }

  download = (filename = 'drawing') => {
    this.#ctx!.fillStyle = this.#opts.bg!
    this.#ctx?.fillRect(0, 0, this.#canvas.width, this.#canvas.height)
    this.#drawPath()
    const a = document.createElement('a')
    a.download = filename
    a.style.display = 'none'
    const dataUrl = this.#canvas.toDataURL()
    a.href = dataUrl
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    this.#log('Download called')
  }
}

export default SketchDrawerHandler
