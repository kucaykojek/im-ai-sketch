'use client'

import Image from 'next/image'
import React, { useState } from 'react'

import { cn } from '@/libs/utils'
import useAISketchStore, {
  GENERATION_RESULT_MAX
} from '@/store/ai-sketch.store'

const Thumbnails = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { resultImages, setSelectedImage } = useAISketchStore()

  const handleClick = (index: number) => {
    setActiveIndex(index)
    setSelectedImage(resultImages[index])
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      {Array.from(Array(GENERATION_RESULT_MAX)).map((_, index) => (
        <React.Fragment key={`thumb-${index}`}>
          {resultImages[index] ? (
            <Image
              src={resultImages[index]}
              alt=""
              width="50"
              height="50"
              className={cn(
                'w-7 h-7 rounded bg-neutral-300 cursor-pointer overflow-hidden object-cover',
                activeIndex === index && '!ring-primary ring-2'
              )}
              placeholder="blur"
              blurDataURL={resultImages[index]}
              onClick={() => handleClick(index)}
            />
          ) : (
            <div className="w-7 h-7 rounded bg-neutral-300"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Thumbnails
