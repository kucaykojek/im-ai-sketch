import { fabric } from 'fabric'

// BEGIN: canvas related types
type CanvasActiveObject = fabric.Rect | null
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
  activeObject: CanvasActiveObject
  activeTool: CanvasActiveTool
}
export type CircleOptions = fabric.ICircleOptions
export type RectangleOptions = fabric.IRectOptions
export type TriangleOptions = fabric.ITriangleOptions
