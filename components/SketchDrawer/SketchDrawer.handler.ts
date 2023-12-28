import {
  DEFAULT_BRUSH_SIZES,
  PATH_KEY,
  SELECTED_DEFAULT_VALUES,
  SELECTED_KEYS
} from './data/constants'
import { FreehandTools, ShapeTools } from './data/enums'
import { SketchDrawerOptions } from './data/types'

class SketchDrawerHandler {
  #canvas = document.createElement('canvas')
  #ctx = this.#canvas.getContext('2d')
  container?: HTMLElement
  #isDrawing = false
  #rzTimeout?: NodeJS.Timeout | null
  #redo: any[] = []

  #CONSTANTS = {
    DATA_KEY: PATH_KEY,
    TOOL_KEY: SELECTED_KEYS.tool,
    COLOR_KEY: SELECTED_KEYS.color,
    BG_KEY: SELECTED_KEYS.bg
  }

  #opts: SketchDrawerOptions = {
    width: 600,
    height: 600,
    logs: false,
    overflow: 'hidden',
    autosave: true
  }

  // Initial values from store
  #paths: any[] = []
  #canvasBg: string = SELECTED_DEFAULT_VALUES.bg
  #selectedTool: FreehandTools | ShapeTools = SELECTED_DEFAULT_VALUES.tool
  #selectedColor: string = SELECTED_DEFAULT_VALUES.color
  #brushSize: number = DEFAULT_BRUSH_SIZES[FreehandTools.Pencil]

  constructor(element: string, opts: SketchDrawerOptions) {
    this.#opts = { ...this.#opts, ...opts }

    this.#initializeContainer(element)
    this.#initializeData()
    this.#initializeTools()
    this.#initializeCanvas()
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

  #initializeData() {
    const { width: elWidth, height: elHeight } =
      this.container!.getBoundingClientRect() as DOMRect
    this.#opts.width = elWidth
    this.#opts.height = elHeight

    if (this.#opts.storeObj) {
      this.#paths = [...this.#opts.storeObj.paths]
      this.#selectedTool = this.#opts.storeObj.selectedTool
      this.#selectedColor = this.#opts.storeObj.selectedColor
      this.#canvasBg = this.#opts.storeObj.canvasBg
      this.#brushSize = this.#opts.storeObj.brushSize
    }
    this.#log('Data Initialized')
  }

  #initializeTools() {
    this.#selectedTool = localStorage.getItem(SELECTED_KEYS.tool)
      ? (localStorage.getItem(SELECTED_KEYS.tool) as FreehandTools | ShapeTools)
      : this.#selectedTool

    this.#selectedColor =
      localStorage.getItem(SELECTED_KEYS.color) || this.#selectedColor

    this.#canvasBg = localStorage.getItem(SELECTED_KEYS.bg) || this.#canvasBg

    this.#log('Tools Initialized')
  }

  #initializeCanvas() {
    this.#initializeCanvasSize()
    this.#canvas.style.background = this.#canvasBg
    this.container!.appendChild(this.#canvas)
    this.#log('Canvas initialized')
  }

  #initializeCanvasSize() {
    this.#canvas.width = this.#opts.width!
    this.#canvas.height = this.#opts.height!
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

  #getFreehandTools() {
    const selectedColor =
      localStorage.getItem(SELECTED_KEYS.color) || this.#selectedColor
    const selectedTool = localStorage.getItem(SELECTED_KEYS.tool)
      ? (localStorage.getItem(SELECTED_KEYS.tool) as FreehandTools)
      : this.#selectedTool

    const freehandProps = {
      [FreehandTools.Pencil]: {
        brushColor: selectedColor,
        brushSize: this.#brushSize,
        lineCap: 'round',
        lineJoin: 'round'
      },
      [FreehandTools.Highlighter]: {
        brushColor: selectedColor + 55,
        brushSize: DEFAULT_BRUSH_SIZES[FreehandTools.Highlighter],
        lineCap: 'butt',
        lineJoin: 'round'
      },
      [FreehandTools.Eraser]: {
        brushColor: this.#canvasBg,
        brushSize: DEFAULT_BRUSH_SIZES[FreehandTools.Eraser],
        lineCap: 'round',
        lineJoin: 'round'
      }
    }

    return (
      freehandProps[selectedTool as FreehandTools] ||
      freehandProps[FreehandTools.Pencil]
    )
  }

  // #getShapeTools() {
  //   const shapeProps = {
  //     [ShapeTools.Square]: {},
  //     [ShapeTools.Circle]: {},
  //     [ShapeTools.Triangle]: {}
  //   }

  //   return (
  //     shapeProps[this.#selectedTool as ShapeTools] ||
  //     shapeProps[ShapeTools.Square]
  //   )
  // }

  // BEGIN: Event Handler
  #handleStart = (e: MouseEvent | TouchEvent) => {
    e.preventDefault()

    if (e instanceof MouseEvent) {
      if (e.button == 0) {
        this.#log('Drawing Started')
        this.#isDrawing = true
        this.#paths.push([[...this.#coordinates(e), this.#getFreehandTools()]])
        this.#draw()
      }
    }

    if (e instanceof TouchEvent) {
      if (e.touches) {
        this.#log('Drawing Started', this.#opts)
        this.#isDrawing = true
        this.#paths.push([[...this.#coordinates(e), this.#getFreehandTools()]])
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
  // END: Event Handler

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

  #draw(storage?: boolean) {
    this.clearOnlyScreen()
    this.#drawPath(storage)
  }

  #drawPath(storage?: boolean) {
    const storagePaths = localStorage.getItem(this.#CONSTANTS.DATA_KEY)
    const usingPath =
      storage && storagePaths ? JSON.parse(storagePaths) : this.#paths

    for (let i = 0; i < usingPath.length; i++) {
      const line = usingPath[i]
      const startPath = line[0]
      this.#ctx!.lineWidth = startPath[2].brushSize
      this.#ctx!.strokeStyle = startPath[2].brushColor
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

  get ctx() {
    return this.#ctx
  }

  get canvas() {
    return this.#canvas
  }

  get selectedTool() {
    return localStorage.getItem(SELECTED_KEYS.tool)
      ? (localStorage.getItem(SELECTED_KEYS.tool) as FreehandTools | ShapeTools)
      : this.#selectedTool
  }

  set selectedTool(tool: FreehandTools | ShapeTools) {
    this.#selectedTool = tool
  }

  get selectedColor() {
    return localStorage.getItem(SELECTED_KEYS.color) || this.#selectedColor
  }

  set selectedColor(color: string) {
    this.#selectedColor = color
  }

  // BEGIN: Public Properties

  // BEGIN: Freehand Tools
  pencil = () => {
    this.saveTool(FreehandTools.Pencil)
  }

  highlighter = () => {
    this.saveTool(FreehandTools.Highlighter)
  }

  eraser = () => {
    this.saveTool(FreehandTools.Eraser)
  }

  clearOnlyScreen = () => {
    this.#ctx?.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
  }

  clear = () => {
    this.clearOnlyScreen()
    this.#paths = []
    this.clearSaved()
    this.#draw(true)
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
      this.save()
      this.#draw(true)
      this.#log('Undo Called')
    }
  }

  redo = () => {
    const redoObj = this.#redo[this.#redo.length - 1]
    if (redoObj && redoObj.type === 'path') {
      this.#paths.push(redoObj.data)
      this.save()
      this.#draw(true)
      this.#redo.pop()
      this.#log('Redo Called')
    }
  }
  // END: Freehand Tools

  // BEGIN: Local Storage
  save = () => {
    localStorage.removeItem(this.#CONSTANTS.DATA_KEY)
    localStorage.setItem(this.#CONSTANTS.DATA_KEY, JSON.stringify(this.#paths))
    if (!this.#opts.autosave) {
      this.#log('Saved!')
    }
  }

  saveTool = (tool: FreehandTools | ShapeTools) => {
    this.#selectedTool = tool
    localStorage.removeItem(this.#CONSTANTS.TOOL_KEY)
    localStorage.setItem(this.#CONSTANTS.TOOL_KEY, tool)
  }

  saveColor = (color: string) => {
    this.#selectedColor = color
    localStorage.removeItem(this.#CONSTANTS.COLOR_KEY)
    localStorage.setItem(this.#CONSTANTS.COLOR_KEY, color)
  }

  clearSaved = () => {
    localStorage.removeItem(this.#CONSTANTS.DATA_KEY)
    localStorage.removeItem(this.#CONSTANTS.TOOL_KEY)
    localStorage.removeItem(this.#CONSTANTS.COLOR_KEY)
    this.#log('Saved cleared')
  }
  // END: Local Storage

  drawFromSaved = () => {
    const paths = localStorage.getItem(this.#CONSTANTS.DATA_KEY)
    if (paths) {
      this.#paths = JSON.parse(paths)
      this.#draw()
    }
    this.#log('Redrawn from save')
  }

  download = (filename = 'drawing') => {
    this.#ctx!.fillStyle = this.#canvasBg
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

  // END: Public Properties
}

export default SketchDrawerHandler
