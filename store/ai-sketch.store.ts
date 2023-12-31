import { create } from 'zustand'

type Payload = {
  image: string
  prompt: string
  strength: number
}

const useAISketchStore = create<{
  payload: Payload
  setPayload: (_: Payload) => void
  generating: boolean
  setGenerating: (_: boolean) => void
  resultImage: string
  setResultImage: (_: string) => void
}>((set) => ({
  payload: { image: '', prompt: '', strength: 0.8 },
  setPayload: (payload: Payload) => set(() => ({ payload })),
  generating: false,
  setGenerating: (generating: boolean) => set(() => ({ generating })),
  resultImage: '',
  setResultImage: (resultImage: string) => set(() => ({ resultImage }))
}))

export default useAISketchStore
