import { fabric } from 'fabric'

// BEGIN: canvas related types
export type PencilObject = Pick<fabric.Object, 'type' | 'name'> &
  PencilOptions &
  fabric.IPathOptions
export type HighlighterObject = Pick<fabric.Object, 'type' | 'name'> &
  HighlighterOptions &
  fabric.IPathOptions
export type ShapeObject = fabric.Object

export type CanvasObject = ShapeObject | PencilObject | HighlighterObject

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
export type PencilOptions = Pick<
  fabric.BaseBrush,
  'width' | 'color' | 'strokeLineCap' | 'strokeLineJoin'
>
export type HighlighterOptions = Pick<
  fabric.BaseBrush,
  'width' | 'color' | 'strokeLineCap' | 'strokeLineJoin'
>
