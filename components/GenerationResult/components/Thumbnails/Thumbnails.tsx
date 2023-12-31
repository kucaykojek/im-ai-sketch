'use client'

import Image from 'next/image'
import { useState } from 'react'

import { cn } from '@/libs/utils'
import useAISketchStore from '@/store/ai-sketch.store'

const Thumbnails = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { resultImage } = useAISketchStore()

  // Result placeholder
  const resultImages = [
    resultImage
      ? `data:image/png;base64, ${resultImage}`
      : 'https://placehold.co/50x50/png',
    'https://placehold.co/50x50/png',
    'https://placehold.co/50x50/png'
  ]

  return (
    <div className="flex flex-col items-center space-y-2">
      {resultImages.map((img, index) => (
        <Image
          key={`thumb-${index}`}
          src={img}
          alt=""
          width="50"
          height="50"
          className={cn(
            'w-7 h-7 rounded bg-neutral-300 cursor-pointer overflow-hidden object-cover',
            activeIndex === index && '!ring-primary ring-2'
          )}
          priority
          onClick={() => setActiveIndex(index)}
        />
      ))}
    </div>
  )
}

export default Thumbnails
