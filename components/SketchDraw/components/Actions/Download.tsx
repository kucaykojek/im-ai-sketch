import { DownloadIcon } from 'lucide-react'

import style from './Actions.module.css'

const Download = () => {
  const handleDownloadClick = () => {}

  return (
    <button disabled className={style.action} onClick={handleDownloadClick}>
      <DownloadIcon />
    </button>
  )
}

export default Download
