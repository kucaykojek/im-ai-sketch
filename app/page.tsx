import GenerationResult, {
  GenerationAdditionalTools
} from '@/components/GenerationResult'
import SketchDrawer, { DrawerAdditionalTools } from '@/components/SketchDrawer'
import Toolbar from '@/components/Toolbar'

export default function Home() {
  return (
    <>
      <main>
        <div className="drawing-wrapper">
          <div className="additional-tool-wrapper">
            <DrawerAdditionalTools />
          </div>
          <SketchDrawer />
        </div>
        <div className="result-wrapper">
          <GenerationResult />
          <div className="additional-tool-wrapper">
            <GenerationAdditionalTools />
          </div>
        </div>
      </main>
      <Toolbar />
    </>
  )
}
