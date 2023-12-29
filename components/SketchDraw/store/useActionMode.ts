import { create } from 'zustand'

import type {
  ActionMode,
  ActionModeOption,
  ActionModeType
} from '../data/types'

const useActionMode = create<{
  actionMode: ActionMode
  setActionMode: (
    _: null | { type: ActionModeType; option?: ActionModeOption | null }
  ) => void
}>((set) => ({
  actionMode: null,
  setActionMode: (params) =>
    set(() => ({
      actionMode: params
        ? {
            type: params.type,
            option: params.option ?? null
          }
        : null
    }))
}))

export default useActionMode
