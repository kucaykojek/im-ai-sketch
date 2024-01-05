import { debounce } from 'lodash'

import blobToBase64 from '@/libs/blobToBase64'
import useAISketchStore, {
  GENERATION_RESULT_KEYS,
  type Payload
} from '@/store/ai-sketch.store'

const useGenerateHandler = () => {
  const {
    payload,
    generating,
    setGenerating,
    setSelectedImage,
    resultImages,
    addResultImages,
    sumGenerationCount
  } = useAISketchStore()

  const generateImage = debounce(async (overridePayload: Payload) => {
    if (!payload.image || !payload.prompt || !payload.strength || generating) {
      return
    }

    setGenerating(true)

    try {
      const generate = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({
          ...payload,
          ...overridePayload
        })
      })

      const resultImage = await generate.blob()

      const image = (await blobToBase64(resultImage)) as string

      addResultImages(image.split(';base64,')[1])
      setSelectedImage(image.split(';base64,')[1])
      sumGenerationCount()

      // Save to local storage
      if (localStorage) {
        localStorage.setItem(
          GENERATION_RESULT_KEYS,
          JSON.stringify([...resultImages, image])
        )
      }
    } catch (error) {
      console.error(error)
    } finally {
      setGenerating(false)
    }
  }, 500)

  return { generateImage }
}

export default useGenerateHandler
