'use client'

import { ExpandIcon, ShrinkIcon, XIcon } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import useAISketchStore from '@/store/ai-sketch.store'

import SliderRange from '../Common/SliderRange'
import useGenerateHandler from '../GenerateImage/GenerateImage.handler'
import style from './Topbar.module.css'

const Topbar = () => {
  const [showClear, setShowClear] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { generateImage, savePayloadToLocalStorage } = useGenerateHandler()
  const form = useForm({
    defaultValues: {
      prompt: '',
      strength: 0.8
    }
  })
  const { payload, setPayload } = useAISketchStore()

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
    form.setValue('prompt', payload.prompt || '')
    form.setValue('strength', payload.strength || 0.8)
  }, [payload.prompt, payload.strength])

  useEffect(() => {
    if (typeof payload.prompt !== 'undefined') {
      setShowClear(payload.prompt.length > 0)
    }
  }, [payload.prompt])

  const onSubmit = (data: any) => {
    setPayload(data)
  }

  const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    const prompt = e.target.value
    setPayload({ prompt })
  }

  const handleStrengthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const strength = Number(e.target.value)
    setPayload({ strength })
  }

  const handleClear = () => {
    setPayload({ prompt: '' })
    savePayloadToLocalStorage({
      ...payload,
      prompt: ''
    })
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
            render={({ field: { value } }) => (
              <input
                type="text"
                name="prompt"
                value={value}
                placeholder="Try: SpongeBob dried up in the middle of the desert"
                className="w-full outline-none border-2 border-neutral-200 focus:border-primary py-1.5 pl-4 pr-80 rounded-lg"
                onChange={handlePromptChange}
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
                render={({ field: { value } }) => (
                  <SliderRange
                    id="strength-slider"
                    min={0}
                    max={1}
                    step={0.1}
                    value={value}
                    onChange={handleStrengthChange}
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
