import { create } from 'zustand'

export type Payload = {
  prompt?: string
  strength?: number
}

export const GENERATION_PAYLOAD_KEYS = 'im-aisketch-generation-payload'
export const GENERATION_RESULT_KEYS = 'im-aisketch-generation-results'
export const GENERATION_RESULT_MAX = 3

const useAISketchStore = create<{
  enabled: boolean
  setEnabled: (_: boolean) => void
  payload: Payload
  setPayload: (_: Payload) => void
  generating: boolean
  setGenerating: (_: boolean) => void
  generationCount: number
  sumGenerationCount: () => void
  selectedImage: string
  setSelectedImage: (_: string) => void
  resultImages: string[]
  setResultImages: (_: string[]) => void
  addResultImages: (_: string) => void
}>((set, get) => ({
  enabled: true,
  setEnabled: (enabled: boolean) => set(() => ({ enabled })),

  payload: { prompt: '', strength: 0.8 },
  setPayload: (payload: Payload) =>
    set(() => ({ payload: { ...get().payload, ...payload } })),

  generating: false,
  setGenerating: (generating: boolean) => set(() => ({ generating })),

  generationCount: 0,
  sumGenerationCount: () =>
    set((state) => ({ generationCount: state.generationCount + 1 })),

  selectedImage: '',
  setSelectedImage: (selectedImage: string) => set(() => ({ selectedImage })),

  resultImages: [],
  setResultImages: (resultImages: string[]) => set(() => ({ resultImages })),
  addResultImages: (image: string) =>
    set((state) => {
      const images = [image, ...state.resultImages]

      if (images.length > GENERATION_RESULT_MAX) {
        images.pop()
      }

      return {
        resultImages: images
      }
    })
}))

export default useAISketchStore
