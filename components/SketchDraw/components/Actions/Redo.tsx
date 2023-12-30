import { Redo2Icon } from 'lucide-react'

import style from './Actions.module.css'

const Redo = () => {
  const handleRedoClick = () => {}

  return (
    <button
      type="button"
      title="Redo"
      className={style.action}
      disabled
      onClick={handleRedoClick}
    >
      <Redo2Icon />
    </button>
  )
}

export default Redo
