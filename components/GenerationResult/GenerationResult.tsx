import { ImageIcon } from 'lucide-react'

const GenerationResult = () => {
  return (
    <div className="h-full bg-white overflow-hidden rounded-xl flex flex-col items-center justify-center text-neutral-300 space-y-6 uppercase font-medium tracking-widest">
      <ImageIcon className="w-60 h-60" />
      <div className="text-xl">Result Placeholder</div>
    </div>
  )
}

export default GenerationResult
