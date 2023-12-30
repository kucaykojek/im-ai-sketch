import { Wand2Icon } from 'lucide-react'

import style from './Actions.module.css'

const Enhance = () => {
  const handleClick = () => {}

  return (
    <button
      title="Enhance"
      className={style.action}
      disabled
      onClick={handleClick}
    >
      <Wand2Icon />
    </button>
  )
}

export default Enhance
