import { create } from 'zustand'

import { COMMON_DEFAULT } from '../data/constants'
import { UserMode } from '../data/types'

const useUserMode = create<{
  userMode: UserMode
  setUserMode: (_: UserMode) => void
}>((set) => ({
  userMode: COMMON_DEFAULT.userMode,
  setUserMode: (userMode: UserMode) => set(() => ({ userMode }))
}))

export default useUserMode
