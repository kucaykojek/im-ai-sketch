'use client'

import { XIcon } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import useAISketchStore, {
  GENERATION_PAYLOAD_KEYS
} from '@/store/ai-sketch.store'

import SliderRange from '../Common/SliderRange'
import useGenerateHandler from '../GenerateImage/GenerateImage.handler'
import style from './Topbar.module.css'

const Topbar = () => {
  const [showClear, setShowClear] = useState(false)
  const { generateImage } = useGenerateHandler()
  const form = useForm({
    defaultValues: {
      prompt: '',
      strength: 0.8
    }
  })
  const { payload, setPayload } = useAISketchStore()

  const prompt = form.watch('prompt')

  useEffect(() => {
    if (typeof prompt !== 'undefined') {
      setShowClear(prompt.length > 0)
    }
  }, [prompt])

  useEffect(() => {
    const storedPayload = localStorage?.getItem(GENERATION_PAYLOAD_KEYS)

    if (!!storedPayload) {
      const { prompt, strength } = JSON.parse(storedPayload)

      form.setValue('prompt', prompt)
      form.setValue('strength', strength)

      setPayload({
        image: '',
        prompt,
        strength: strength ? Number(strength) : 0
      })
    }
  }, [])

  const onSubmit = (data: any) => {
    setPayload(data)

    generateImage(data)
  }

  const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    const prompt = e.target.value

    form.setValue('prompt', prompt)
    setPayload({ ...payload, prompt })

    if (!!prompt) {
      generateImage({ ...payload, prompt })
    }
  }

  const handleStrengthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const strength = Number(e.target.value)

    form.setValue('strength', strength)
    setPayload({ ...payload, strength })

    generateImage({ ...payload, strength })
  }

  const handleClear = () => {
    form.setValue('prompt', '')
    setPayload({ ...payload, prompt: '' })
  }

  return (
    <div className={style.topbar}>
      <form
        className={style.topbarContainer}
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
            <button onClick={handleClear}>
              <XIcon className="w-6 h-6 text-neutral-400 hover:text-primary" />
            </button>
          )}
          <div className="text-sm font-semibold">Imagination</div>
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
      </form>
    </div>
  )
}

export default Topbar
