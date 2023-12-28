'use client'

import {
  MousePointerClickIcon,
  Redo2Icon,
  Trash2Icon,
  Undo2Icon
} from 'lucide-react'

import { useSketchDrawerContext } from './SketchDrawer.context'

const DrawerAdditionalTools = () => {
  const { instance } = useSketchDrawerContext()

  const handleUndo = () => {
    return instance?.undo()
  }
  const handleRedo = () => {
    return instance?.redo()
  }
  const handleClear = () => {
    return instance?.clear()
  }

  return (
    <>
      {!instance &&
        Array.from(new Array(4)).map((_, index) => (
          <div
            key={`drawer-additional-tool-${index}`}
            className="animate-pulse rounded bg-neutral-300 h-8 w-8"
          ></div>
        ))}
      {instance && (
        <>
          <button disabled>
            <MousePointerClickIcon />
          </button>
          <button disabled onClick={handleUndo}>
            <Undo2Icon />
          </button>
          <button disabled onClick={handleRedo}>
            <Redo2Icon />
          </button>
          <button disabled onClick={handleClear}>
            <Trash2Icon />
          </button>
        </>
      )}
    </>
  )
}

export default DrawerAdditionalTools
