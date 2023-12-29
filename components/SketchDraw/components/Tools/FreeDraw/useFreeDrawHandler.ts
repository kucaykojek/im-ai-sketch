import useSketchDrawContext from '../../../SketchDraw.context'
import type { UserMode } from '../../../data/types'
import useActiveObjectId from '../../../store/useActiveObjectId'
import useUserMode from '../../../store/useUserMode'

const useFreeDrawHandler = () => {
  const { canvasRef } = useSketchDrawContext()
  const { setActiveObjectId } = useActiveObjectId()
  const { userMode, setUserMode } = useUserMode()

  const handleClick = (mode: UserMode) => {
    setUserMode(mode)
    setActiveObjectId(null)
  }

  return { userMode, handleClick, disabled: !canvasRef }
}

export default useFreeDrawHandler
