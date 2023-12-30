import { Paintbrush2Icon } from 'lucide-react'

import SliderRange from '@/components/Common/SliderRange'
import useShapeType from '@/components/SketchDraw/store/useShapeType'
import useStrokeWidth from '@/components/SketchDraw/store/useStrokeWidth'
import useUserMode from '@/components/SketchDraw/store/useUserMode'
import isLineBasedType from '@/components/SketchDraw/utils/isLineBasedType'
import isShapeBasedType from '@/components/SketchDraw/utils/isShapeBasedType'
import { cn } from '@/libs/utils'

import style from '../Dock.module.css'

const ToolOptions = () => {
  const { userMode } = useUserMode()
  const { strokeWidth, setStrokeWidth } = useStrokeWidth()
  const { shapeType, setShapeType } = useShapeType()

  const options = {
    pencil: {
      strokeWidth: strokeWidth['pencil']
    },
    highlighter: {
      strokeWidth: strokeWidth['highlighter']
    },
    eraser: { strokeWidth: strokeWidth['eraser'] },
    circle: {
      shapeType: shapeType,
      strokeWidth: strokeWidth['circle']
    },
    square: {
      shapeType: shapeType,
      strokeWidth: strokeWidth['square']
    },
    triangle: {
      shapeType: shapeType,
      strokeWidth: strokeWidth['triangle']
    },
    icon: {},
    image: {},
    select: {},
    text: {}
  }[userMode]

  const shouldShowStrokeOptions =
    typeof options.strokeWidth === 'number' &&
    (isLineBasedType(userMode) ||
      (isShapeBasedType(userMode) && shapeType === 'outline'))

  const shouldShowShapeOptions = isShapeBasedType(userMode)

  const isActive = shouldShowStrokeOptions || shouldShowShapeOptions

  return (
    <div className={cn(style.toolOptions, isActive && style.toolOptionsActive)}>
      <div className="uppercase text-xs font-semibold mr-4">{userMode}{userMode === 'eraser' && ' / masking'}</div>
      {shouldShowShapeOptions && (
        <div className="flex items-center text-sm font-medium rounded overflow-hidden">
          <button
            className={cn(
              'px-2 py-1 bg-neutral-200',
              shapeType === 'fill' && 'bg-primary'
            )}
            onClick={() => setShapeType('fill')}
          >
            Fill
          </button>
          <button
            className={cn(
              'px-2 py-1 bg-neutral-200',
              shapeType === 'outline' && 'bg-primary'
            )}
            onClick={() => setShapeType('outline')}
          >
            Outline
          </button>
        </div>
      )}
      {shouldShowStrokeOptions && (
        <div className="flex items-center space-x-2">
          {isLineBasedType(userMode) && <Paintbrush2Icon />}
          <SliderRange
            id={`stroke-opt-${userMode}`}
            value={options.strokeWidth || 1}
            min={1}
            max={isLineBasedType(userMode) ? 100 : 20}
            step={1}
            onChange={(e) =>
              setStrokeWidth({ [userMode]: Number(e.target.value) })
            }
          />
          <div className="text-sm font-medium w-4">
            {options.strokeWidth || 1}
          </div>
        </div>
      )}
    </div>
  )
}

export default ToolOptions
