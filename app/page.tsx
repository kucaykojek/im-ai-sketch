'use client'

// import CanvasInfo from '@/components/CanvasInfo'
import Dock from '@/components/Dock'
import GenerationResult, {
  Actions as GenerationActions,
  Thumbnails as GenerationThumbnails
} from '@/components/GenerationResult'
import GenerationInfo from '@/components/ResultInfo'
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
            <SketchActions.Select />
            <SketchActions.Duplicate />
            <SketchActions.Delete />
            <hr />
            <SketchActions.New />
            <SketchActions.Background />
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

      {/* Debugger Components */}
      {/* <CanvasInfo /> */}
      <GenerationInfo />
      {/* Debugger Components */}
    </SketchDrawProvider>
  )
}
