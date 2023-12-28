import { useSketchDrawerContext } from '@/components/SketchDrawer/SketchDrawer.context'

const GenerationResult = () => {
  const { counter } = useSketchDrawerContext()

  return (
    <div className="h-full bg-white overflow-hidden rounded-xl flex flex-col items-center justify-center text-neutral-300 uppercase font-medium tracking-widest">
      <div>Generation Result Here</div>
      <div className="normal-case tracking-normal font-normal text-sm text-neutral-400 text-center mt-2">
        <div className="font-medium">Counter From Canvas</div>
        Drawing: {counter?.drawing}
        <br />
        Object: {counter?.object}
        <br />
      </div>
    </div>
  )
}

export default GenerationResult
