/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useReducer } from 'react'
import { WF_INIT_DATA } from './constant'
import { WorkFlow } from './type'

interface StateContextType extends WorkFlow {}

const StateContext = createContext<StateContextType>({})
const ControlContext = createContext({})

interface Props {
  children: ReactNode
}

function reducer(state: WorkFlow) {
  return state
}
export const WorkflowProvider: React.FC<Props> = ({ children }) => {
  const [state] = useReducer(reducer, WF_INIT_DATA)
  const methods = {}

  return (
    <StateContext.Provider value={state}>
      <ControlContext.Provider value={methods}>
        {children}
      </ControlContext.Provider>
    </StateContext.Provider>
  )
}

export function useWorkflowState() {
  const context = useContext(StateContext)

  if (context === undefined) {
    throw new Error('useWorkflowState must be used within a WorkflowProvider')
  }

  return context
}

export function useWorkflowControls() {
  const context = useContext(ControlContext)

  if (context === undefined) {
    throw new Error(
      'useWorkflowControls must be used within a WorkflowProvider'
    )
  }

  return context
}
