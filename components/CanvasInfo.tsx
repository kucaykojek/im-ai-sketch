'use client'

import { useEffect, useState } from 'react'

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import useActionMode from '@/components/SketchDraw/store/useActionMode'
import useCanvasObjects from '@/components/SketchDraw/store/useCanvasObjects'
import isObjectPointBasedType from '@/components/SketchDraw/utils/isObjectPointBasedType'
import isObjectShapeBasedType from '@/components/SketchDraw/utils/isObjectShapeBasedType'
import useAISketchStore from '@/store/ai-sketch.store'

const CanvasInfo = () => {
  const [metadata, setMetadata] = useState({
    line: 0,
    shape: 0,
    text: 0,
    image: 0,
    size: 0
  })
  const { generating, payload, resultImage, setResultImage, setGenerating } =
    useAISketchStore()
  const { canvasRef } = useSketchDrawContext()
  const { actionMode } = useActionMode()
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

  // TEST GENERATE IMAGE -->
  useEffect(() => {
    if (!actionMode && canvasRef.current) {
      generateImages(
        canvasRef.current.toDataURL('image/jpeg').split(';base64,')[1]
      )
    }
  }, [actionMode])

  const generateImages = async (sourceImage: string) => {
    if (generating || !payload.prompt || !!resultImage) {
      return
    }

    setGenerating(true)

    try {
      const generate = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({
          ...payload,
          image: sourceImage
        })
      })

      const {
        data: { image }
      } = await generate.json()

      setResultImage(image)
      if (localStorage) {
        localStorage.setItem('im-aisketch-result', image)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setGenerating(false)
    }
  }
  // <-- TEST GENERATE IMAGE

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
