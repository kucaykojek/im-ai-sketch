import { DownloadIcon } from 'lucide-react'

import useAISketchStore from '@/store/ai-sketch.store'

import style from './Actions.module.css'

const Download = () => {
  const { selectedImage } = useAISketchStore()

  const handleClick = () => {
    if (selectedImage) {
      const a = document.createElement('a')
      a.download = `result-${new Date().getTime()}`
      a.style.display = 'none'
      a.href = `data:image/png;base64,${selectedImage}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <button
      title="Download"
      className={style.action}
      disabled={!selectedImage}
      onClick={handleClick}
    >
      <DownloadIcon />
    </button>
  )
}

export default Download
