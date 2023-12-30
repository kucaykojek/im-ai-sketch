'use client'

import Dock from '@/components/Dock'
import GenerationResult, {
  Actions as GenerationActions,
  Thumbnails as GenerationThumbnails
} from '@/components/GenerationResult'
import Sidebar from '@/components/Sidebar/Sidebar'
import SketchDraw, {
  Actions as SketchActions,
  SketchDrawProvider
} from '@/components/SketchDraw'
import Topbar from '@/components/Topbar'

export default function Home() {
  return (
    <SketchDrawProvider>
      <Topbar />

      <main>
        <div className="drawing-wrapper">
          <Sidebar position="left">
            <SketchActions.New />
            <SketchActions.Background />
            <hr />
            <SketchActions.Select />
            <SketchActions.Duplicate />
            <SketchActions.Delete />
            <hr />
            <SketchActions.Download />
          </Sidebar>

          <SketchDraw />
        </div>
        <div className="result-wrapper">
          <Sidebar position="right">
            <GenerationActions.Enhance />
            <GenerationActions.Regenerate />
            <hr />
            <GenerationThumbnails />
            <hr />
            <GenerationActions.Download />
          </Sidebar>

          <GenerationResult />
        </div>
      </main>

      <Dock />
    </SketchDrawProvider>
  )
}
