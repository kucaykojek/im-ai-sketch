'use client'

import { ImageIcon, Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

import useAISketchStore, {
  GENERATION_PAYLOAD_KEYS,
  GENERATION_RESULT_KEYS
} from '@/store/ai-sketch.store'

import useSketchDrawContext from '../SketchDraw/SketchDraw.context'
import useCanvas from '../SketchDraw/store/useCanvas'
import useGenerateHandler from './GenerateImage.handler'

const GenerateImage = () => {
  const { canvas } = useCanvas()
  const { canvasRef } = useSketchDrawContext()
  const { generateImage } = useGenerateHandler()
  const {
    payload,
    generating,
    selectedImage,
    setPayload,
    setResultImages,
    setSelectedImage
  } = useAISketchStore()

  useEffect(() => {
    const storedPayload = localStorage?.getItem(GENERATION_PAYLOAD_KEYS)
    const storedResult = localStorage?.getItem(GENERATION_RESULT_KEYS)

    if (!!storedPayload) {
      setPayload(JSON.parse(storedPayload))
    }

    if (!!storedResult) {
      const images = JSON.parse(storedResult)

      setResultImages(images)
      setSelectedImage(images[0] || '')
    }
  }, [])

  useEffect(() => {
    if (canvas && canvasRef.current) {
      const generatingImage = () => {
        generateImage()
      }

      canvas.on('after:render', generatingImage)

      return () => {
        canvas.off('after:render', generatingImage)
      }
    }
  }, [canvas, canvasRef, generating, payload])

  return (
    <div className="relative h-full bg-white overflow-hidden rounded-xl flex flex-col items-center justify-center">
      {generating && (
        <div className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2Icon className="w-12 h-12 animate-spin text-primary" />
        </div>
      )}

      {selectedImage ? (
        <Image
          src={selectedImage}
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

export default GenerateImage
