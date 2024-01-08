'use client'

import { debounce, omit } from 'lodash'

import blobToBase64 from '@/libs/blobToBase64'
import useAISketchStore, {
  GENERATION_PAYLOAD_KEYS,
  GENERATION_RESULT_KEYS,
  type Payload
} from '@/store/ai-sketch.store'

import useSketchDrawContext from '../SketchDraw/SketchDraw.context'
import useCanvas from '../SketchDraw/store/useCanvas'

const useGenerateHandler = () => {
  const { canvasRef } = useSketchDrawContext()
  const { canvas } = useCanvas()
  const {
    enabled,
    payload,
    generating,
    setGenerating,
    setSelectedImage,
    resultImages,
    addResultImages,
    sumGenerationCount
  } = useAISketchStore()

  const generateImage = debounce(async (overridePayload?: Payload) => {
    if (
      !enabled ||
      !canvasRef.current ||
      !canvas ||
      canvas.getObjects().length === 0 ||
      canvas.getActiveObjects().length > 0 ||
      !payload.prompt ||
      !payload.strength ||
      generating
    ) {
      return
    }

    const canvasImage = canvasRef.current.toDataURL('image/jpeg')

    setGenerating(true)

    try {
      const generate = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({
          ...payload,
          ...(overridePayload ? overridePayload : {}),
          image: canvasImage
        })
      })

      const resultImage = await generate.blob()

      const image = (await blobToBase64(resultImage)) as string

      addResultImages(image)
      setSelectedImage(image)
      sumGenerationCount()
      saveResultsToLocalStorage([...resultImages, image])
    } catch (error) {
      console.error(error)
    } finally {
      setGenerating(false)
    }
  }, 500)

  const savePayloadToLocalStorage = (payload: Payload) => {
    if (localStorage) {
      localStorage.setItem(
        GENERATION_PAYLOAD_KEYS,
        JSON.stringify(omit(payload, ['image']))
      )
    }
  }

  const saveResultsToLocalStorage = (images: string[]) => {
    if (localStorage) {
      localStorage.setItem(GENERATION_RESULT_KEYS, JSON.stringify(images))
    }
  }

  return { generateImage, savePayloadToLocalStorage, saveResultsToLocalStorage }
}

export default useGenerateHandler
