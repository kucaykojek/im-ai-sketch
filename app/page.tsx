import dynamic from 'next/dynamic'

import GenerationResult from '@/components/GenerationResult'
import Toolbar from '@/components/Toolbar'

const SketchDrawer = dynamic(() => import('@/components/SketchDrawer'), {
  ssr: true
})

export default function Home() {
  return (
    <>
      <main>
        <div className="drawing-wrapper">
          <SketchDrawer />
        </div>
        <div className="result-wrapper">
          <GenerationResult />
        </div>
      </main>
      <Toolbar />
    </>
  )
}
