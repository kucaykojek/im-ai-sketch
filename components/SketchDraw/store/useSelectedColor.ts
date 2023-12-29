import { create } from 'zustand'

import { COMMON_DEFAULT } from '../data/constants'

type SelectedColor = string

const useSelectedColor = create<{
  selectedColor: SelectedColor
  setSelectedColor: (_: SelectedColor) => void
}>((set) => ({
  selectedColor: COMMON_DEFAULT.selectedColor,
  setSelectedColor: (selectedColor: SelectedColor) =>
    set(() => ({ selectedColor }))
}))

export default useSelectedColor
