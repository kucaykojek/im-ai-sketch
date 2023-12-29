'use client'

import { XIcon } from 'lucide-react'
import { useState } from 'react'

import SliderRange from '../Common/SliderRange'
import style from './Topbar.module.css'

const Topbar = () => {
  const [prompt, setPrompt] = useState('')
  const [imagination, setImagination] = useState(70)

  return (
    <div className={style.topbar}>
      <div className={style.topbarContainer}>
        <input
          type="text"
          value={prompt}
          placeholder="Try: SpongeBob dried up in the middle of the desert"
          className="w-full outline-none border-2 border-neutral-200 focus:border-primary py-1.5 pl-4 rounded-lg"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="flex items-center absolute right-4 top-0 h-full space-x-3">
          {prompt.length > 0 && (
            <button onClick={() => setPrompt('')}>
              <XIcon className="w-6 h-6 text-neutral-400 hover:text-primary" />
            </button>
          )}
          <div className="text-sm font-semibold">Imagination</div>
          <SliderRange
            id="imagination-slider"
            min={20}
            max={100}
            step={1}
            value={imagination}
            onChange={(e) => setImagination(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}

export default Topbar
