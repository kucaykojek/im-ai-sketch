'use client'

import GenerationResult, {
  GenerationAdditionalTools
} from '@/components/GenerationResult'
import SketchDraw, {
  SketchDrawAdditionalTools,
  SketchDrawProvider
} from '@/components/SketchDraw'
// import SketchDrawer, { DrawerAdditionalTools } from '@/components/SketchDrawer'
// import SketchDrawerProvider from '@/components/SketchDrawer/SketchDrawer.context'
import Toolbar from '@/components/Toolbar'

export default function Home() {
  return (
    <SketchDrawProvider>
      <main>
        <div className="drawing-wrapper">
          <div className="additional-tool-wrapper">
            <SketchDrawAdditionalTools />
          </div>
          {/* <SketchDrawer /> */}
          <SketchDraw />
        </div>
        <div className="result-wrapper">
          <GenerationResult />
          <div className="additional-tool-wrapper">
            <GenerationAdditionalTools />
          </div>
        </div>
      </main>
      <Toolbar />
    </SketchDrawProvider>
  )
}
