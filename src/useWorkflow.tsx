/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useReducer } from 'react'
import { WF_INIT_DATA } from './constant'
import { NodeConfig, WorkFlow } from './type'
import { updateObject } from './utils'

interface StateContextType extends WorkFlow {}
interface ControlContextType {
  updateNode: (node: NodeConfig | null) => void
}

const StateContext = createContext<StateContextType>({})
const ControlContext = createContext<ControlContextType | undefined>(undefined)

interface Props {
  children: ReactNode
}

function reducer(
  state: WorkFlow,
  action: { type: string; payload: NodeConfig | null }
) {
  switch (action.type) {
    case 'update_node': {
      return updateObject(state, { nodeConfig: action.payload })
    }
    default:
      return state
  }
}
export const WorkflowProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, WF_INIT_DATA)

  const methods = {
    updateNode: (node: NodeConfig | null) =>
      dispatch({ type: 'update_node', payload: node }),
  }

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
