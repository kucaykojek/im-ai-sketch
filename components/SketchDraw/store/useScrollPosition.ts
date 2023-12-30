import { create } from 'zustand'

import type { ScrollPosition } from '@/sketch-draw/data/types'

interface ScrollPositionDelta {
  deltaX: number
  deltaY: number
}

const useScrollPosition = create<{
  scrollPosition: ScrollPosition
  setScrollPosition: (_: ScrollPosition) => void
  updateScrollPosition: (_: ScrollPositionDelta) => void
}>((set) => ({
  scrollPosition: { x: 0, y: 0 },
  setScrollPosition: (scrollPosition: ScrollPosition) =>
    set(() => ({ scrollPosition })),
  updateScrollPosition: (delta: ScrollPositionDelta) =>
    set((state) => ({
      scrollPosition: {
        x: state.scrollPosition.x + delta.deltaX,
        y: state.scrollPosition.y + delta.deltaY
      }
    }))
}))

export default useScrollPosition
