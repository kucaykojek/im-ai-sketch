'use client'

import GenerationResult, {
  GenerationAdditionalTools
} from '@/components/GenerationResult'
import SketchDraw, {
  SketchDrawAdditionalTools,
  SketchDrawProvider
} from '@/components/SketchDraw'
import Toolbar from '@/components/Toolbar'

export default function Home() {
  return (
    <SketchDrawProvider>
      <main>
        <div className="drawing-wrapper">
          <div className="additional-tool-wrapper">
            <SketchDrawAdditionalTools />
          </div>
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
