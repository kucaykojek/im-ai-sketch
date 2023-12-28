export type SketchDrawerProps = {
  id?: string
}

export type SketchDrawerOptions = {
  width?: number
  height?: number
  bg?: string
  color?: string
  brushSize?: number
  logs?: boolean
  lineCap?: 'round' | 'butt'
  lineJoin?: 'round' | 'butt'
  autosave?: boolean
  overflow?: 'hidden'
}
