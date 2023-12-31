import { create } from 'zustand'

type Payload = {
  image: string
  prompt: string
  strength: number
}

export const GENERATION_PAYLOAD_KEYS = 'im-aisketch-payload'
export const GENERATION_RESULT_KEYS = 'im-aisketch-results'
export const GENERATION_RESULT_MAX = 3

const useAISketchStore = create<{
  payload: Payload
  setPayload: (_: Payload) => void
  balance: number
  setBalance: (_: number) => void
  generating: boolean
  setGenerating: (_: boolean) => void
  generationCount: number
  sumGenerationCount: () => void
  generationCostedCredits: number
  sumGenerationCostedCredits: (_: number) => void
  selectedImage: string
  setSelectedImage: (_: string) => void
  resultImages: string[]
  setResultImages: (_: string[]) => void
  addResultImages: (_: string) => void
}>((set) => ({
  payload: { image: '', prompt: '', strength: 0.8 },
  setPayload: (payload: Payload) => set(() => ({ payload })),

  balance: 0,
  setBalance: (balance: number) => set(() => ({ balance })),

  generating: false,
  setGenerating: (generating: boolean) => set(() => ({ generating })),

  generationCount: 0,
  sumGenerationCount: () =>
    set((state) => ({ generationCount: state.generationCount + 1 })),

  generationCostedCredits: 0,
  sumGenerationCostedCredits: (n: number) =>
    set((state) => ({
      generationCostedCredits: state.generationCostedCredits + n
    })),

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
