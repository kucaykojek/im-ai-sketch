import useCanvasObjects from '@/components/SketchDraw/store/useCanvasObjects'

const GenerationResult = () => {
  const { canvasObjects } = useCanvasObjects()

  return (
    <div className="h-full bg-white overflow-hidden rounded-xl flex flex-col items-center justify-center text-neutral-300 uppercase font-medium tracking-widest">
      <div>Generation Result Here</div>
      <div className="normal-case tracking-normal font-normal text-sm text-neutral-400 text-center mt-2">
        <div className="font-medium">Counter From Canvas</div>
        Object: {canvasObjects?.length}
        <br />
      </div>
    </div>
  )
}

export default GenerationResult
