'use client'

import Dock from '@/components/Dock'
import GenerationResult, {
  GenerationAdditionalTools
} from '@/components/GenerationResult'
import SketchDraw, {
  SketchDrawAdditionalTools,
  SketchDrawProvider
} from '@/components/SketchDraw'
import Topbar from '@/components/Topbar'

export default function Home() {
  return (
    <SketchDrawProvider>
      <Topbar />

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

      <Dock />
    </SketchDrawProvider>
  )
}
