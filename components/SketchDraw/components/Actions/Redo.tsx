import { Redo2Icon } from 'lucide-react'

import style from './Actions.module.css'

const Redo = () => {
  const handleRedoClick = () => {}

  return (
    <button className={style.action} onClick={handleRedoClick}>
      <Redo2Icon />
    </button>
  )
}

export default Redo
