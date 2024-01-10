'use client'

import { ImageIcon, Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

import useAISketchStore, {
  GENERATION_PAYLOAD_KEYS,
  GENERATION_RESULT_KEYS
} from '@/store/ai-sketch.store'

import useSketchDrawStore from '../SketchDraw/store/SketchDraw.store'
import useGenerateHandler from './GenerateImage.handler'

const GenerateImage = () => {
  const { canvasRef, canvas } = useSketchDrawStore()
  const { generateImage } = useGenerateHandler()
  const {
    enabled,
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
  }, [setPayload, setResultImages, setSelectedImage])

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
  }, [canvas, canvasRef, generating, payload, enabled])

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
          fill={true}
          alt=""
          placeholder="blur"
          blurDataURL={selectedImage}
        />
      ) : (
        <div className="text-neutral-300">
          <ImageIcon className="w-24 h-24 md:w-32 md:h-60 xl:w-60 xl:h-52 mx-auto" />
        </div>
      )}
    </div>
  )
}

export default GenerateImage
