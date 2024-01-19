import React, { useRef, useState } from 'react'
import { ADD_TYPE, NODE_TYPE } from '../type'
import useVirtualBackdrop from '../useVirtualBackdrop'
import useCaptureEscKey from '../useCaptureEscKey'
import { nodeNames } from '../constant'

interface Props {
  isOpen: boolean
  onClose: () => void
  onAddNode: (
    type: ADD_TYPE,
    nodeType: Exclude<NODE_TYPE, NODE_TYPE.CONDITIONS | NODE_TYPE.INITIATOR>
  ) => void
}
const AddNodePopover: React.FC<Props> = ({ isOpen, onClose, onAddNode }) => {
  const ref = useRef(null)
  const [type, setType] = useState<ADD_TYPE | undefined>(undefined)

  const options: Exclude<
    NODE_TYPE,
    NODE_TYPE.CONDITIONS | NODE_TYPE.INITIATOR
  >[] = [
    NODE_TYPE.APPROVAL,
    NODE_TYPE.FORWARD,
    NODE_TYPE.HANDLER,
    NODE_TYPE.ROUTING,
  ]

  const handleClose = () => {
    onClose()
    setType(undefined)
  }

  const renderMenuContent = () => {
    if (type !== undefined) {
      return options.map((nodeType) => (
        <button
          key={nodeType}
          onClick={() => {
            onAddNode(type, nodeType)
            setType(undefined)
          }}
        >
          {nodeNames[nodeType]}
        </button>
      ))
    }
    return [ADD_TYPE.Sequential, ADD_TYPE.Parallel].map((type) => (
      <button key={type} onClick={() => setType(type)}>
        {type === ADD_TYPE.Sequential ? 'Sequential' : 'Parallel'}
      </button>
    ))
  }

  useVirtualBackdrop(isOpen, ref, handleClose)

  useCaptureEscKey(isOpen, handleClose)

  if (!isOpen) return null
  return (
    <div className="add-node-menu" ref={ref}>
      <div className="backdrop" onMouseDown={(e) => e.preventDefault()} />
      <div className="add-node-menu-box">{renderMenuContent()}</div>
    </div>
  )
}

export default AddNodePopover
