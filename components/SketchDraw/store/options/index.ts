import EllipseOptions from './EllipseOptions.store'
import EraserOptions from './EraserOptions.store'
import HighlighterOptions from './HighlighterOptions.store'
import PencilOptions from './PencilOptions.store'
import RectOptions from './RectOptions.store'
import TextOptions from './TextOptions.store'
import TriangleOptions from './TriangleOptions.store'

const useToolsOptionsStore = () => {
  const Ellipse = EllipseOptions()
  const Eraser = EraserOptions()
  const Highlighter = HighlighterOptions()
  const Pencil = PencilOptions()
  const Rect = RectOptions()
  const Text = TextOptions()
  const Triangle = TriangleOptions()

  return {
    Ellipse,
    Eraser,
    Highlighter,
    Pencil,
    Rect,
    Text,
    Triangle
  }
}

export default useToolsOptionsStore
