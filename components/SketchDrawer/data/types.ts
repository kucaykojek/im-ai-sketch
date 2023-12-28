import { Dispatch } from 'react'

import SketchDrawerHandler from '../SketchDrawer.handler'
import {
  FreehandTools as FreehandToolsEnum,
  ShapeTools as ShapeToolsEnum
} from './enums'

export type Counter = {
  object: number
  drawing: number
}

export type SketchDrawerProps = {
  id?: string
}

export type SketchDrawerOptions = {
  width?: number
  height?: number
  logs?: boolean
  autosave?: boolean
  overflow?: 'hidden'
  storeObj?: SketchDrawerStoreObject
  counterCallback?: Dispatch<Counter>
}

export type SketchDrawerStoreContextType = {
  instance?: SketchDrawerHandler
  setInstance: (_: SketchDrawerHandler) => void
  counter?: Counter
  setCounter: Dispatch<Counter>
}

export type SketchDrawerStoreObject = {
  paths: any[]
  canvasBg: string
  freehandTools: FreehandTools
  shapesTools: ShapeTools
  selectedColor: string
  selectedTool: FreehandToolsEnum | ShapeToolsEnum
  brushSize: number
}

export type SketchDrawerStoreSetter = {
  setPaths: (_: any) => void
  setCanvasBg: (_: string) => void
  setFreehandTools: (_: FreehandTools) => void
  setShapeTools: (_: ShapeTools) => void
  setSelectedColor: (_: string) => void
  setSelectedTool: (_: FreehandToolsEnum | ShapeToolsEnum) => void
  setBrushSize: (_: number) => void
}

export type SketchDrawerStore = SketchDrawerStoreObject &
  SketchDrawerStoreSetter

export type FreehandTools = {
  brushColor: string
  brushSize: number
  lineCap: string
  lineJoin: string
}

export type ShapeTools = {}
