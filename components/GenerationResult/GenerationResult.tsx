'use client'

import { useEffect, useState } from 'react'

import useCanvasObjects from '@/components/SketchDraw/store/useCanvasObjects'

import isLineBasedType from '../SketchDraw/utils/isLineBasedType'
import isShapeBasedType from '../SketchDraw/utils/isShapeBasedType'

const GenerationResult = () => {
  const [stringSize, setStringSize] = useState(0)
  const { canvasObjects } = useCanvasObjects()

  useEffect(() => {
    const filteredObjects =
      canvasObjects.filter(
        (val) =>
          (isLineBasedType(val.type) && val.freeDrawPoints.length > 1) ||
          (isShapeBasedType(val.type) && val.width > 0 && val.height > 8)
      ) || ''

    setStringSize(new Blob([JSON.stringify(filteredObjects)]).size)
  }, [canvasObjects])

  return (
    <div className="h-full bg-white overflow-hidden rounded-xl flex flex-col items-center justify-center text-neutral-300 uppercase font-medium tracking-widest">
      <div className="text-xl">Generation Result Placeholder</div>
      <div className="normal-case tracking-normal font-normal text-sm text-neutral-400 text-center mt-2">
        <div className="font-medium uppercase">Canvas Data</div>
        <p>
          Shape Based Objects:{' '}
          <strong>
            {canvasObjects?.filter((val) => isShapeBasedType(val.type))?.length}
          </strong>
        </p>
        <p>
          Line Based Objects:{' '}
          <strong>
            {canvasObjects?.filter((val) => isLineBasedType(val.type))?.length}
          </strong>
        </p>
        <p>
          String Data Size:{' '}
          <strong>{stringSize > 2 ? stringSize : 0} bytes</strong>
        </p>
      </div>
    </div>
  )
}

export default GenerationResult
