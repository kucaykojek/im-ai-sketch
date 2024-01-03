'use client'

import useAISketchStore from '@/store/ai-sketch.store'

const GenerationInfo = () => {
  const { generationCount } = useAISketchStore()

  return (
    <div className="fixed z-0 bottom-0 right-0 p-4">
      <div className="font-normal text-xs text-neutral-400/70 text-right">
        <div className="font-medium uppercase">Result Info</div>
        <p>
          Generation: <strong>{generationCount}</strong>
        </p>
      </div>
    </div>
  )
}

export default GenerationInfo
