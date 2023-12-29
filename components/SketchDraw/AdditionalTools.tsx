'use client'

import useSketchDrawerContext from './SketchDraw.context'
import { Download, Redo, Select, Undo } from './components/Actions'

const SketchDrawAdditionalTools = () => {
  const { canvasRef } = useSketchDrawerContext()

  return (
    <>
      {!canvasRef &&
        Array.from(new Array(4)).map((_, index) => (
          <div
            key={`drawer-additional-tool-${index}`}
            className="animate-pulse rounded bg-neutral-300 h-8 w-8"
          ></div>
        ))}
      {canvasRef && (
        <>
          <Select />
          <Undo />
          <Redo />
          <Download />
        </>
      )}
    </>
  )
}

export default SketchDrawAdditionalTools
