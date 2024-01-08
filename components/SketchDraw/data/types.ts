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

import SketchDrawHistory from '../SketchDraw.history'

// BEGIN: canvas related types
export type EllipseOptions = Pick<
  FabricObjectProps,
  'fill' | 'strokeWidth' | 'stroke' | 'opacity'
>
export type RectOptions = Pick<
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
  | 'ellipse'
  | 'rect'
  | 'triangle'
  | 'textbox'
  | 'icon'
  | 'image'
  | null

export type CanvasType = {
  canvas: Canvas | null
  history: SketchDrawHistory | null
  canvasOptions: Pick<CanvasOptions, 'backgroundColor' | 'width' | 'height'>
  selectedObjects: CanvasObject[]
  activeTool: CanvasActiveTool
}
