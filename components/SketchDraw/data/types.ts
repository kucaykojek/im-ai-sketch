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
import { MutableRefObject } from 'react'

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

export type HistoryCommand = {
  groupId?: string
  undo: () => void
  redo: () => void
}
export interface HistoryManager {
  on: (_status: boolean) => void
  add: (_command: HistoryCommand) => HistoryManager
  setCallback: (_callbackFunc: () => void | Promise<void>) => void
  undo: () => HistoryManager
  redo: () => HistoryManager
  clear: () => HistoryManager
  canUndo: () => boolean
  canRedo: () => boolean
  getCommands: (_groupId?: string) => HistoryCommand[]
  getIndex: () => number
  setLimit: (_max: number) => void
}

export type SketchDraw = {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
  containerRef: MutableRefObject<HTMLDivElement | null>
  containerSize: {
    width: number
    height: number
  }
  initialSize: {
    width: number
    height: number
  }
  canvas: Canvas | null
  history: HistoryManager | null
  canvasOptions: Pick<CanvasOptions, 'backgroundColor' | 'width' | 'height'>
  selectedObjects: CanvasObject[]
  activeTool: CanvasActiveTool
}
