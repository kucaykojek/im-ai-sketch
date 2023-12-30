'use client'

import { useEffect, useState } from 'react'

import useCanvasObjects from '@/components/SketchDraw/store/useCanvasObjects'
import isObjectPointBasedType from '@/components/SketchDraw/utils/isObjectPointBasedType'
import isObjectShapeBasedType from '@/components/SketchDraw/utils/isObjectShapeBasedType'

const CanvasInfo = () => {
  const [metadata, setMetadata] = useState({
    line: 0,
    shape: 0,
    text: 0,
    image: 0,
    size: 0
  })
  const { canvasObjects } = useCanvasObjects()

  useEffect(() => {
    const filteredObjects =
      canvasObjects.filter(
        (val) =>
          (isObjectPointBasedType(val.type) && val.points!.length > 1) ||
          (isObjectShapeBasedType(val.type) &&
            val.width > 0 &&
            val.height > 0) ||
          val.type === 'text' ||
          val.type === 'image'
      ) || []

    const shape = filteredObjects.filter((val) =>
      isObjectShapeBasedType(val.type)
    ).length
    const line = filteredObjects.filter((val) =>
      isObjectPointBasedType(val.type)
    ).length
    const text = filteredObjects.filter((val) => val.type === 'text').length
    const image = filteredObjects.filter((val) => val.type === 'image').length
    const size = new Blob([
      filteredObjects.length ? JSON.stringify(filteredObjects) : ''
    ]).size

    setMetadata({
      line,
      shape,
      text,
      image,
      size: size > 2 ? size : 0
    })
  }, [canvasObjects])

  return (
    <div className="fixed z-0 bottom-0 right-0 p-4">
      <div className="font-normal text-xs text-neutral-400/70 text-right">
        <div className="font-medium uppercase">Canvas Information</div>
        <p>
          Shape: <strong>{metadata.shape}</strong>
        </p>
        <p>
          Line: <strong>{metadata.line}</strong>
        </p>
        <p>
          Text: <strong>{metadata.text}</strong>
        </p>
        <p>
          Image: <strong>{metadata.image}</strong>
        </p>
        <p>
          Data Size: <strong>{metadata.size} bytes</strong>
        </p>
      </div>
    </div>
  )
}

export default CanvasInfo
