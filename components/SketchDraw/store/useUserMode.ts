import { create } from 'zustand'

import { COMMON_DEFAULT } from '@/sketch-draw/data/constants'
import { UserMode } from '@/sketch-draw/data/types'

const useUserMode = create<{
  userMode: UserMode
  setUserMode: (_: UserMode) => void
}>((set) => ({
  userMode: COMMON_DEFAULT.userMode,
  setUserMode: (userMode: UserMode) => set(() => ({ userMode }))
}))

export default useUserMode
