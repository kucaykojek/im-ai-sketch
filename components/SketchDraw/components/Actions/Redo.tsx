import { Redo2Icon } from 'lucide-react'

import useSketchDrawContext from '../../SketchDraw.context'
import useCanvas from '../../store/useCanvas'
import style from './Actions.module.css'

const Redo = () => {
  const { isReady } = useSketchDrawContext()
  const { canvas, history } = useCanvas()

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
