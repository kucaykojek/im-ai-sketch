'use client'

import Image from 'next/image'

import Dock from '@/components/Dock'
import GenerationResult, {
  Actions as GenerationActions
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
            <SketchActions.Select />
            <SketchActions.Undo />
            <SketchActions.Redo />
            <SketchActions.Delete />
            <hr />
            <SketchActions.Background />
            <SketchActions.Download />
          </Sidebar>

          <SketchDraw />
        </div>
        <div className="result-wrapper">
          <Sidebar position="right">
            <GenerationActions.Enhance />
            <GenerationActions.Regenerate />
            <hr />
            <Image
              src="https://placehold.co/100x100/png"
              alt=""
              width="100"
              height="100"
              className="w-8 h-8 rounded border-2 border-primary"
            />
            <Image
              src="https://placehold.co/100x100/png"
              alt=""
              width="100"
              height="100"
              className="w-8 h-8 rounded"
            />
            <GenerationActions.Download />
          </Sidebar>

          <GenerationResult />
        </div>
      </main>

      <Dock />
    </SketchDrawProvider>
  )
}
