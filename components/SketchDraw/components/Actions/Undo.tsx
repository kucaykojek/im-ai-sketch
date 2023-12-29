import { Undo2Icon } from 'lucide-react'

import style from './Actions.module.css'

const Undo = () => {
  const handleUndoClick = () => {}

  return (
    <button disabled className={style.action} onClick={handleUndoClick}>
      <Undo2Icon />
    </button>
  )
}

export default Undo
