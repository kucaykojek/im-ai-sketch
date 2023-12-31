'use client'

import { ImageIcon, Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

import useAISketchStore from '@/store/ai-sketch.store'

const GenerationResult = () => {
  const { generating, resultImage, setResultImage } = useAISketchStore()

  useEffect(() => {
    const storedResult = localStorage?.getItem('im-aisketch-result')

    if (!!storedResult) {
      setResultImage(storedResult)
    }
  }, [])

  return (
    <div className="relative h-full bg-white overflow-hidden rounded-xl flex flex-col items-center justify-center">
      {generating && (
        <div className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2Icon className="w-12 h-12 animate-spin text-primary" />
        </div>
      )}

      {resultImage ? (
        <Image
          src={`data:image/png;base64, ${resultImage}`}
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
