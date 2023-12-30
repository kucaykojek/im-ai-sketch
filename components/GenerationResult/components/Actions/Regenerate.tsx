import { RefreshCcwIcon } from 'lucide-react'

import style from './Actions.module.css'

const Regenerate = () => {
  const handleClick = () => {}

  return (
    <button
      title="Re-Generate"
      className={style.action}
      disabled
      onClick={handleClick}
    >
      <RefreshCcwIcon />
    </button>
  )
}

export default Regenerate
