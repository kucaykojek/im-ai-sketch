import { fabric } from 'fabric'

// BEGIN: canvas related types
type CanvasObject = fabric.Object
type CanvasActiveTool =
  | 'pencil'
  | 'highlighter'
  | 'eraser'
  | 'circle'
  | 'rectangle'
  | 'triangle'
  | 'text'
  | 'icon'
  | 'image'
  | null

export type Canvas = {
  canvas: fabric.Canvas | null
  canvasOptions: fabric.ICanvasOptions
  selectedObjects: CanvasObject[]
  activeTool: CanvasActiveTool
}
export type CircleOptions = fabric.ICircleOptions
export type RectangleOptions = fabric.IRectOptions
export type TriangleOptions = fabric.ITriangleOptions
