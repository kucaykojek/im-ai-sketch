'use client'

import GenerationResult, {
  GenerationAdditionalTools
} from '@/components/GenerationResult'
import SketchDrawer, { DrawerAdditionalTools } from '@/components/SketchDrawer'
import SketchDrawerProvider from '@/components/SketchDrawer/SketchDrawer.context'
import Toolbar from '@/components/Toolbar'

export default function Home() {
  return (
    <SketchDrawerProvider>
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
    </SketchDrawerProvider>
  )
}
