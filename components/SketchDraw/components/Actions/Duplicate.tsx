import { CopyIcon } from 'lucide-react'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'

import style from './Actions.module.css'

const Duplicate = () => {
  const { isReady } = useSketchDrawContext()

  const handleClick = () => {}

  return (
    <button
      type="button"
      title="Duplicate"
      className={style.action}
      disabled={!isReady}
      onClick={handleClick}
    >
      <CopyIcon />
    </button>
  )
}

export default Duplicate
