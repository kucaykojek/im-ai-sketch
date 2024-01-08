import { Undo2Icon } from 'lucide-react'

import useSketchDrawContext from '../../SketchDraw.context'
import useCanvas from '../../store/useCanvas'
import style from './Actions.module.css'

const Undo = () => {
  const { isReady } = useSketchDrawContext()
  const { canvas, history } = useCanvas()

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
