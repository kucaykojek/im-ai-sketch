import { BG_STORAGE_KEY } from '../data/constants'

export function saveBackgroundToStorage(background: string) {
  if (localStorage) {
    localStorage.setItem(BG_STORAGE_KEY, background)
  }
}
