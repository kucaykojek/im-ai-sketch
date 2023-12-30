import { BG_STORAGE_KEY } from '@/sketch-draw/data/constants'

export default function saveBackgroundToStorage(background: string) {
  if (localStorage) {
    localStorage.setItem(BG_STORAGE_KEY, background)
  }
}
