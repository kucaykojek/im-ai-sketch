import type {
  BaseBrush,
  Canvas,
  CanvasOptions,
  FabricObject,
  FabricObjectProps,
  FabricText,
  PathProps,
  TextboxProps
} from 'fabric'

// BEGIN: canvas related types
export type CircleOptions = Pick<
  FabricObjectProps,
  'fill' | 'strokeWidth' | 'stroke' | 'opacity'
>
export type RectangleOptions = Pick<
  FabricObjectProps,
  'fill' | 'strokeWidth' | 'stroke' | 'opacity'
>
export type TriangleOptions = Pick<
  FabricObjectProps,
  'fill' | 'strokeWidth' | 'stroke' | 'opacity'
>
export type PencilOptions = Pick<
  BaseBrush,
  'width' | 'color' | 'strokeLineCap' | 'strokeLineJoin'
>
export type HighlighterOptions = Pick<
  BaseBrush,
  'width' | 'color' | 'strokeLineCap' | 'strokeLineJoin'
>
export type EraserOptions = Pick<
  BaseBrush,
  'width' | 'strokeLineCap' | 'strokeLineJoin'
>
export type TextOptions = Pick<
  TextboxProps,
  | 'fontFamily'
  | 'fontWeight'
  | 'fontStyle'
  | 'underline'
  | 'linethrough'
  | 'fill'
> & {
  text?: string
}

export type PencilObject = FabricObject & PencilOptions & PathProps
export type EraserObject = FabricObject & EraserOptions & PathProps
export type HighlighterObject = FabricObject & HighlighterOptions & PathProps
export type ShapeObject = FabricObject
export type TextObject = FabricText

export type CanvasObject =
  | ShapeObject
  | PencilObject
  | EraserObject
  | HighlighterObject
  | TextObject

type CanvasActiveTool =
  | 'pencil'
  | 'eraser'
  | 'highlighter'
  | 'circle'
  | 'rectangle'
  | 'triangle'
  | 'text'
  | 'icon'
  | 'image'
  | null

export type CanvasType = {
  canvas: Canvas | null
  canvasOptions: Pick<CanvasOptions, 'backgroundColor' | 'width' | 'height'>
  selectedObjects: CanvasObject[]
  activeTool: CanvasActiveTool
}
