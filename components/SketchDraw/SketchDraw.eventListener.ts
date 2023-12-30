import { useEffect } from 'react'

import useSketchDrawContext from './SketchDraw.context'
import { CANVAS_ID } from './data/constants'
import { UserMode } from './data/types'
import useActiveObjectId from './store/useActiveObjectId'
import useCanvasObjects from './store/useCanvasObjects'
import useCanvasWorkingSize from './store/useCanvasWorkingSize'
import useContainerSize from './store/useContainerSize'
import useUserMode from './store/useUserMode'
import saveObjectsToStorage from './utils/saveObjectsToStorage'

export default function SketchDrawEventListeners() {
  const { containerRef, initCanvas, drawEverything } = useSketchDrawContext()

  const { activeObjectId, setActiveObjectId } = useActiveObjectId()
  const { userMode, setUserMode } = useUserMode()
  const { setCanvasWorkingWidth, setCanvasWorkingHeight } =
    useCanvasWorkingSize()
  const { setContainerSize } = useContainerSize()
  const { canvasObjects, deleteCanvasObject } = useCanvasObjects()

  // Set initial window size
  useEffect(() => {
    if (containerRef.current) {
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      })
      setCanvasWorkingWidth(containerRef.current.offsetWidth)
      setCanvasWorkingHeight(containerRef.current.offsetHeight)
    }
  }, [setContainerSize])

  // Resize event
  useEffect(() => {
    const onResize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
        setCanvasWorkingWidth(containerRef.current.offsetWidth)
        setCanvasWorkingHeight(containerRef.current.offsetHeight)
      }
      initCanvas()
      drawEverything()
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [setContainerSize, initCanvas, drawEverything])

  // Pointerdown event
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const wasCanvasClick = (event.target as HTMLElement)?.id === CANVAS_ID
      const userModesToClose: UserMode[] = ['icon', 'image']
      if (wasCanvasClick && userModesToClose.includes(userMode)) {
        setUserMode('select')
      }
    }

    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [setUserMode, userMode])

  // Keydown event
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isInputFocused = ['input', 'textarea'].includes(
        document.activeElement?.localName || ''
      )
      const deleteKeys: KeyboardEvent['key'][] = ['Backspace', 'Delete']
      if (deleteKeys.includes(event.key) && !isInputFocused && activeObjectId) {
        deleteCanvasObject(activeObjectId)
        setActiveObjectId(null)

        // BEGIN: update storage
        const filtedCanvasObjects = canvasObjects.filter(
          (obj) => obj.id !== activeObjectId
        )
        saveObjectsToStorage(filtedCanvasObjects)
        // END: update storage
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeObjectId, canvasObjects, deleteCanvasObject, setActiveObjectId])

  // Beforeunload event
  useEffect(() => {
    const onBeforeUnload = () => {
      return confirm('Are you sure?')
    }

    window.addEventListener('onbeforeunload', onBeforeUnload)
    return () => {
      window.removeEventListener('onbeforeunload', onBeforeUnload)
    }
  }, [])

  // Gesturestart event
  useEffect(() => {
    const onGestureStart = (event: Event) => {
      event.preventDefault()
    }

    window.addEventListener('ongesturestart', onGestureStart)
    return () => {
      window.removeEventListener('ongesturestart', onGestureStart)
    }
  }, [])

  return null
}
