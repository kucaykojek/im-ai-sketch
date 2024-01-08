'use client'

import { ExpandIcon, ShrinkIcon, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import useAISketchStore, {
  GENERATION_PAYLOAD_KEYS
} from '@/store/ai-sketch.store'

import SliderRange from '../Common/SliderRange'
import useGenerateHandler from '../GenerateImage/GenerateImage.handler'
import style from './Topbar.module.css'

const Topbar = () => {
  const [showClear, setShowClear] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { payload, setPayload } = useAISketchStore()
  const { generateImage, savePayloadToLocalStorage } = useGenerateHandler()
  const form = useForm({
    defaultValues: localStorage?.getItem(GENERATION_PAYLOAD_KEYS)
      ? {
          ...JSON.parse(localStorage?.getItem(GENERATION_PAYLOAD_KEYS)!)
        }
      : {
          prompt: payload.prompt || '',
          strength: payload.strength || 0.8
        }
  })

  const prompt = form.watch('prompt')
  const strength = form.watch('strength')

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscren)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscren)
    }
  }, [])

  useEffect(() => {
    generateImage(payload)
  }, [payload])

  useEffect(() => {
    setPayload({ prompt: prompt, strength: Number(strength) })
    savePayloadToLocalStorage({
      ...payload,
      prompt: prompt,
      strength: Number(strength)
    })
  }, [prompt, strength, setPayload])

  useEffect(() => {
    form.setValue('strength', payload.strength || 0.8)
  }, [payload.strength])

  useEffect(() => {
    if (typeof payload.prompt !== 'undefined') {
      setShowClear(payload.prompt.length > 0)
    }
  }, [payload.prompt])

  const onSubmit = (data: any) => {
    setPayload(data)
  }

  const handleClear = () => {
    form.setValue('prompt', '')
  }
  const handleFullscren = () => {
    if (!document.fullscreenElement) {
      setIsFullscreen(false)
    }
  }

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      windowed()
    } else {
      fullscreen()
    }
  }

  const fullscreen = () => {
    const elem = document.documentElement
    if (elem && !isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      }

      setIsFullscreen(!isFullscreen)
    }
  }

  const windowed = () => {
    if (document && isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  return (
    <div className={style.topbar}>
      <form
        className={style.topbarContainer}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="relative grow">
          <Controller
            control={form.control}
            name="prompt"
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <input
                type="text"
                name="prompt"
                value={value}
                placeholder="Try: SpongeBob dried up in the middle of the desert"
                className="w-full outline-none border-2 border-neutral-200 focus:border-primary py-1.5 pl-4 pr-80 rounded-lg"
                onChange={onChange}
              />
            )}
          />
          <div className="flex items-center absolute right-4 top-0 h-full space-x-3">
            {showClear && (
              <button type="button" onClick={handleClear}>
                <XIcon className="w-6 h-6 text-neutral-400 hover:text-primary" />
              </button>
            )}
            <div className="text-sm font-semibold">Imagination</div>
            <div className="w-36 flex items-center">
              <Controller
                control={form.control}
                name="strength"
                render={({ field: { value, onChange } }) => (
                  <SliderRange
                    id="strength-slider"
                    min={0}
                    max={1}
                    step={0.1}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          data-tooltip-id="topbar-tooltip"
          data-tooltip-content={isFullscreen ? 'Shrink' : 'Expand'}
          className="text-neutral-600 w-7 h-7 flex items-center justify-center"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <ShrinkIcon /> : <ExpandIcon />}
        </button>
      </form>
    </div>
  )
}

export default Topbar
