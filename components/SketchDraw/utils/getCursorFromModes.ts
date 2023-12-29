import type { CSSProperties } from 'react'

import type { ActionMode, UserMode } from '../data/types'

export default function getCursorFromUserMode({
  userMode,
  actionMode
}: {
  userMode: UserMode
  actionMode: ActionMode
}): CSSProperties['cursor'] {
  switch (userMode) {
    case 'select': {
      if (actionMode?.type === 'isMoving') {
        return 'move'
      }
      if (actionMode?.type === 'isPanning') {
        return 'grabbing'
      }

      switch (actionMode?.option) {
        case 'topLeft':
          return 'nwse-resize'
        case 'topCenter':
          return 'ns-resize'
        case 'topRight':
          return 'nesw-resize'
        case 'middleLeft':
          return 'ew-resize'
        case 'middleRight':
          return 'ew-resize'
        case 'bottomLeft':
          return 'nesw-resize'
        case 'bottomCenter':
          return 'ns-resize'
        case 'bottomRight':
          return 'nwse-resize'
        default:
          return 'auto'
      }
    }
    case 'pencil':
    case 'highlighter':
    case 'eraser':
    case 'circle':
    case 'square':
    case 'triangle':
      return 'crosshair'
    case 'text':
      return 'text'
    default:
      return 'auto'
  }
}
