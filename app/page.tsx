'use client'

import CanvasInfo from '@/components/CanvasInfo'
import Dock from '@/components/Dock'
import GenerateImage, {
  Actions as GenerationActions,
  Thumbnails as GenerationThumbnails
} from '@/components/GenerateImage'
import GenerationInfo from '@/components/ResultInfo'
import Sidebar from '@/components/Sidebar/Sidebar'
import SketchDraw, { Actions as SketchActions } from '@/components/SketchDraw'
import Topbar from '@/components/Topbar'

export default function Home() {
  return (
    <>
      <Topbar />

      <main>
        <div className="drawing-wrapper">
          <Sidebar position="left">
            <SketchActions.Select />
            <SketchActions.Duplicate />
            <SketchActions.Undo />
            <SketchActions.Redo />
            <SketchActions.Delete />
            <hr />
            <SketchActions.Clear />
            <SketchActions.Background />
            <hr />
            <SketchActions.Save />
            <SketchActions.Download />
          </Sidebar>

          <SketchDraw />
        </div>
        <div className="result-wrapper">
          <Sidebar position="right">
            <GenerationActions.Stop />
            <hr />
            <GenerationActions.Enhance />
            <GenerationActions.Regenerate />
            <hr />
            <GenerationThumbnails />
            <hr />
            <GenerationActions.Download />
          </Sidebar>

          <GenerateImage />
        </div>
      </main>

      <Dock />

      {/* INFO Components */}
      <CanvasInfo />
      <GenerationInfo />
      {/* INFO Components */}
    </>
  )
}
