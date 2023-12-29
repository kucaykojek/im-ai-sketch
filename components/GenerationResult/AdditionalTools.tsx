'use client'

import { DownloadIcon, RefreshCcwIcon, Wand2Icon } from 'lucide-react'

import { useSketchDrawContext } from '@/components/SketchDraw'

const GenerationAdditionalTools = () => {
  const { canvasRef } = useSketchDrawContext()

  return (
    <>
      {!canvasRef &&
        Array.from(new Array(3)).map((_, index) => (
          <div
            key={`generation-additional-tool-${index}`}
            className="animate-pulse rounded bg-neutral-300 h-8 w-8"
          ></div>
        ))}
      {canvasRef && (
        <>
          <button disabled>
            <Wand2Icon />
          </button>
          <button disabled>
            <RefreshCcwIcon />
          </button>
          <button disabled>
            <DownloadIcon />
          </button>
        </>
      )}
    </>
  )
}

export default GenerationAdditionalTools
