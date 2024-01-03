import { fabric } from 'fabric'

import useSquareOptions from '@/components/SketchDraw/store/object/useRectangleOptions'

import useCanvas from './store/useCanvas'

const useSketchDrawHandler = () => {
  const { activeTool, canvas } = useCanvas()
  const { options: squareOptions } = useSquareOptions()

  const initDraw = (e: any) => {
    if (canvas) {
      const pointer = canvas.getPointer(e.memo.e)
      let obj

      switch (activeTool) {
        case 'rectangle':
          obj = new fabric.Rect({
            width: 1,
            height: 1,
            left: pointer.x,
            top: pointer.y,
            ...squareOptions
          })
          break

        default:
          break
      }

      if (obj) {
        canvas.add(obj)
        canvas.setActiveObject(obj)
        canvas.renderAll()
      }
    }
  }

  return { initDraw }
}

export default useSketchDrawHandler
