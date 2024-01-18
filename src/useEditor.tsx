/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useState } from 'react'
import { ZOOM_TYPE } from './type'

interface Props {
  children: ReactNode
}

type ContextType = {
  size: number
  zoomSize?: (type?: ZOOM_TYPE) => void
}

const Context = createContext<ContextType>({
  size: 100,
})

export const EditorProvider: React.FC<Props> = ({ children }) => {
  const [size, setSize] = useState(100)

  const zoomSize = (type?: ZOOM_TYPE) => {
    if (type === undefined) {
      setSize(100)
      return
    }
    if (type === ZOOM_TYPE.OUT) {
      if (size === 50) {
        return
      }
      setSize((prev) => prev - 10)
    } else {
      if (size === 300) {
        return
      }
      setSize((prev) => prev + 10)
    }
  }

  return (
    <Context.Provider value={{ size, zoomSize }}>{children}</Context.Provider>
  )
}

export function useEditor() {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useEditor must be used within a EditorProvider')
  }

  return context
}
