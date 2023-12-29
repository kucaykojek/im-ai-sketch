import { create } from 'zustand'

type ActiveObjectId = string | null

const useActiveObjectId = create<{
  activeObjectId: ActiveObjectId
  setActiveObjectId: (_: ActiveObjectId) => void
}>((set) => ({
  activeObjectId: null,
  setActiveObjectId: (activeObjectId: ActiveObjectId) =>
    set(() => ({ activeObjectId }))
}))

export default useActiveObjectId
