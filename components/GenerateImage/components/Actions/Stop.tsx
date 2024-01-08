import { PowerIcon, PowerOffIcon } from 'lucide-react'

import { cn } from '@/libs/utils'
import useAISketchStore from '@/store/ai-sketch.store'

import style from './Actions.module.css'

const Stop = () => {
  const { enabled, setEnabled } = useAISketchStore()

  const handleClick = () => {
    setEnabled(!enabled)
  }

  return (
    <button
      title={enabled ? 'Disable Generation' : 'Enable Generation'}
      className={cn(
        style.action,
        enabled ? '!text-green-600' : '!text-red-600'
      )}
      onClick={handleClick}
    >
      {enabled ? <PowerIcon /> : <PowerOffIcon />}
    </button>
  )
}

export default Stop
