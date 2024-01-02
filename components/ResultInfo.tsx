'use client'

import { useEffect } from 'react'

import useAISketchStore from '@/store/ai-sketch.store'

const GenerationInfo = () => {
  const { resultImages, generationCount, balance, setBalance } =
    useAISketchStore()

  const fetchBalance = async () => {
    const balance = await fetch('/api/balance', {
      method: 'GET'
    })

    const { data } = await balance.json()

    setBalance(data.amount || 0)
  }

  useEffect(() => {
    fetchBalance()
  }, [resultImages])

  return (
    <div className="fixed z-0 bottom-0 right-0 p-4">
      <div className="font-normal text-xs text-neutral-400/70 text-right">
        <div className="font-medium uppercase">Result Info</div>
        <p>
          Generation: <strong>{generationCount}</strong>
        </p>
        <p>
          Balance: <strong>{balance.toFixed(5)}</strong>
        </p>
      </div>
    </div>
  )
}

export default GenerationInfo
