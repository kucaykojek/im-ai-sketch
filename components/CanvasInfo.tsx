'use client'

import { useEffect, useState } from 'react'

import useCanvas from './SketchDraw/store/useCanvas'

const CanvasInfo = () => {
  const [metadata, setMetadata] = useState({
    objects: 0,
    size: 0
  })

  const { canvas } = useCanvas()

  useEffect(() => {
    if (canvas) {
      const calcualteObjectMeta = () => {
        const objects = canvas.getObjects()
        setMetadata({
          objects: objects.length,
          size:
            objects.length > 0 ? new Blob([JSON.stringify(objects)]).size : 0
        })
      }

      canvas.on('object:added', calcualteObjectMeta)
      canvas.on('object:removed', calcualteObjectMeta)

      return () => {
        canvas.off('object:added', calcualteObjectMeta)
        canvas.off('object:removed', calcualteObjectMeta)
      }
    }
  }, [canvas])

  return (
    <div className="fixed z-0 bottom-0 left-0 p-4">
      <div className="font-normal text-xs text-neutral-400/70 text-left">
        <div className="font-medium uppercase">Canvas Info</div>
        <p>
          Object:{' '}
          <strong>
            {metadata.objects} / {metadata.size} bytes
          </strong>
        </p>
      </div>
    </div>
  )
}

export default CanvasInfo
