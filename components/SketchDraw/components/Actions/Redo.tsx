import { Redo2Icon } from 'lucide-react'

import useSketchDrawStore from '../../store/SketchDraw.store'
import style from './Actions.module.css'

const Redo = () => {
  const { isReady, canvas, history } = useSketchDrawStore()

  const handleRedoClick = () => {
    if (!canvas || !history || !history?.canRedo()) {
      return
    }
    history?.redo()
  }

  return (
    <button
      type="button"
      title="Redo"
      className={style.action}
      disabled={!isReady || !history?.canRedo()}
      onClick={handleRedoClick}
    >
      <Redo2Icon />
    </button>
  )
}

export default Redo
