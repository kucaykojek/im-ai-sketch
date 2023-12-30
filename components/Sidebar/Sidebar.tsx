import { cn } from '@/libs/utils'

import style from './Sidebar.module.css'

type Props = {
  position?: 'left' | 'right'
  children: React.ReactNode
}

const Sidebar = ({ position = 'left', children }: Props) => {
  return (
    <div
      className={cn(
        style.sidebar,
        position === 'left' ? '-left-16' : '-right-16'
      )}
    >
      {children}
    </div>
  )
}

export default Sidebar
