import { createContext, useContext, useState } from 'react'
import React from 'react'

import SketchDrawerHandler from './SketchDrawer.handler'
import { SketchDrawerStoreContextType } from './data/types'

export const SketchDrawerContext = createContext<
  SketchDrawerStoreContextType | undefined
>(undefined)

export const SketchDrawerProvider: React.FC<any> = (props) => {
  const [instance, setInstance] = useState<SketchDrawerHandler>()
  const [counter, setCounter] = useState(0)

  const value = { instance, counter, setInstance, setCounter }

  return <SketchDrawerContext.Provider value={value} {...props} />
}

export const useSketchDrawerContext = (): SketchDrawerStoreContextType => {
  const context = useContext(SketchDrawerContext)
  if (context === undefined) {
    throw new Error(
      'useSketchDrawerContext must be used within an SketchDrawerProvider'
    )
  }
  return context
}

export default SketchDrawerProvider
