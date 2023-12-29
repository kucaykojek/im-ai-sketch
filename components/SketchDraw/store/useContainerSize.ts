import { create } from 'zustand'

interface ContainerSize {
  width: number
  height: number
}

const useContainerSize = create<{
  containerSize: ContainerSize
  setContainerSize: (_: ContainerSize) => void
}>((set) => ({
  containerSize: { width: 0, height: 0 },
  setContainerSize: (containerSize: ContainerSize) =>
    set((state) => ({ ...state, containerSize }))
}))

export default useContainerSize
