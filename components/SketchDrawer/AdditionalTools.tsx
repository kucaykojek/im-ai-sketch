'use client'

import {
  MousePointerClickIcon,
  Redo2Icon,
  Trash2Icon,
  Undo2Icon
} from 'lucide-react'

import useSketchDrawerStore from './SketchDrawer.store'

const DrawerAdditionalTools = () => {
  const { instance } = useSketchDrawerStore()

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
          <button>
            <Undo2Icon />
          </button>
          <button>
            <Redo2Icon />
          </button>
          <button>
            <Trash2Icon />
          </button>
        </>
      )}
    </>
  )
}

export default DrawerAdditionalTools
