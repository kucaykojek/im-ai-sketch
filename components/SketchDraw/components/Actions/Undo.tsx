import { Undo2Icon } from 'lucide-react'

import style from './Actions.module.css'

const Undo = () => {
  const handleUndoClick = () => {}

  return (
    <button
      type="button"
      title="Undo"
      className={style.action}
      disabled
      onClick={handleUndoClick}
    >
      <Undo2Icon />
    </button>
  )
}

export default Undo
