'use client'

import { debounce } from 'lodash'
import { ImageIcon, Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import useActionMode from '@/components/SketchDraw/store/useActionMode'
import useAISketchStore, {
  GENERATION_RESULT_KEYS
} from '@/store/ai-sketch.store'

const GenerationResult = () => {
  const { canvasRef } = useSketchDrawContext()
  const { actionMode } = useActionMode()
  const {
    payload,
    generating,
    setGenerating,
    selectedImage,
    setSelectedImage,
    resultImages,
    setResultImages,
    addResultImages,
    sumGenerationCount
  } = useAISketchStore()

  useEffect(() => {
    const storedResult = localStorage?.getItem(GENERATION_RESULT_KEYS)

    if (!!storedResult) {
      const images = JSON.parse(storedResult)

      setResultImages(images)
      setSelectedImage(images[0] || '')
    }
  }, [])

  useEffect(() => {
    if (!actionMode && canvasRef.current) {
      generateImages(
        canvasRef.current.toDataURL('image/jpeg').split(';base64,')[1]
      )
    }
  }, [actionMode])

  const blobToBase64 = (blob: Blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.readAsDataURL(blob)
    })
  }

  const generateImages = debounce(async (sourceImage: string) => {
    if (generating || !payload.prompt) {
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
  })

  return (
    <div className="relative h-full bg-white overflow-hidden rounded-xl flex flex-col items-center justify-center">
      {generating && (
        <div className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2Icon className="w-12 h-12 animate-spin text-primary" />
        </div>
      )}

      {selectedImage ? (
        <Image
          src={`data:image/png;base64,${selectedImage}`}
          priority
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt=""
        />
      ) : (
        <div className="text-neutral-300 space-y-6 uppercase font-medium tracking-widest">
          <ImageIcon className="w-60 h-60" />
          <div className="text-xl">Result Placeholder</div>
        </div>
      )}
    </div>
  )
}

export default GenerationResult
