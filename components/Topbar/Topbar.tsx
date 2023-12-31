'use client'

import { XIcon } from 'lucide-react'

import useAISketchStore from '@/store/ai-sketch.store'

import SliderRange from '../Common/SliderRange'
import style from './Topbar.module.css'

const Topbar = () => {
  const { payload, setPayload } = useAISketchStore()

  return (
    <div className={style.topbar}>
      <div className={style.topbarContainer}>
        <input
          type="text"
          name="prompt"
          value={payload.prompt}
          placeholder="Try: SpongeBob dried up in the middle of the desert"
          className="w-full outline-none border-2 border-neutral-200 focus:border-primary py-1.5 pl-4 pr-80 rounded-lg"
          onChange={(e) => setPayload({ ...payload, prompt: e.target.value })}
        />
        <div className="flex items-center absolute right-4 top-0 h-full space-x-3">
          {payload.prompt.length > 0 && (
            <button onClick={() => setPayload({ ...payload, prompt: '' })}>
              <XIcon className="w-6 h-6 text-neutral-400 hover:text-primary" />
            </button>
          )}
          <div className="text-sm font-semibold">Imagination</div>
          <SliderRange
            id="imagination-slider"
            min={0}
            max={1}
            step={0.1}
            value={payload.strength}
            onChange={(e) =>
              setPayload({ ...payload, strength: Number(e.target.value) })
            }
          />
        </div>
      </div>
    </div>
  )
}

export default Topbar
