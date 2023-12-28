'use client'

import { DownloadIcon, RefreshCcwIcon, Wand2Icon } from 'lucide-react'

import { useSketchDrawerContext } from '@/components/SketchDrawer/SketchDrawer.context'

const GenerationAdditionalTools = () => {
  const { instance } = useSketchDrawerContext()

  return (
    <>
      {!instance &&
        Array.from(new Array(3)).map((_, index) => (
          <div
            key={`generation-additional-tool-${index}`}
            className="animate-pulse rounded bg-neutral-300 h-8 w-8"
          ></div>
        ))}
      {instance && (
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
