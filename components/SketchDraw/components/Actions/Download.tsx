import { DownloadIcon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import generateUniqueId from '@/sketch-draw/utils/generateUniqueId'

import style from './Actions.module.css'

const Download = () => {
  const { isReady, canvasRef } = useSketchDrawContext()

  const handleDownloadClick = () => {
    if (canvasRef.current) {
      const a = document.createElement('a')
      a.download = `drawing-${generateUniqueId()}`
      a.style.display = 'none'
      const dataUrl = canvasRef.current.toDataURL()
      a.href = dataUrl
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <button
      type="button"
      title="Download"
      disabled={!isReady}
      className={style.action}
      onClick={handleDownloadClick}
    >
      <DownloadIcon />
    </button>
  )
}

export default Download
