import { DownloadIcon } from 'lucide-react'

import style from './Actions.module.css'

const Download = () => {
  const handleClick = () => {}

  return (
    <button
      title="Download"
      className={style.action}
      disabled
      onClick={handleClick}
    >
      <DownloadIcon />
    </button>
  )
}

export default Download
