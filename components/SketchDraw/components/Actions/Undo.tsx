import { Undo2Icon } from 'lucide-react'

import useSketchDrawStore from '../../store/SketchDraw.store'
import style from './Actions.module.css'

const Undo = () => {
  const { isReady, canvas, history } = useSketchDrawStore()

  const handleUndoClick = () => {
    if (!canvas || !history || !history?.canUndo()) {
      return
    }
    history?.undo()
  }

  return (
    <button
      type="button"
      title="Undo"
      className={style.action}
      disabled={!isReady || !history?.canUndo()}
      onClick={handleUndoClick}
    >
      <Undo2Icon />
    </button>
  )
}

export default Undo
