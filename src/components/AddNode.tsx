import { useState } from 'react'
import { nodeNames } from '../constant'
import { ADD_TYPE, NODE_TYPE, NodeConfig } from '../type'
import AddNodePopover from './AddNodePopover'

interface Props {
  root: NodeConfig
  childNode: NodeConfig[] | null
  updateNode: (node: NodeConfig) => void
}

const AddNode: React.FC<Props> = ({ root, childNode, updateNode }) => {
  console.log('🚀 ~ root:', root)
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handleSelectNode = (
    type: ADD_TYPE,
    nodeType: Exclude<NODE_TYPE, NODE_TYPE.CONDITIONS | NODE_TYPE.INITIATOR>
  ) => {
    setIsOpenMenu(false)
    const newNode = {
      nodeName: nodeNames[nodeType],
      type: nodeType,
      nodeUserList: [],
      childNode: null,
    }
    const newRoot: NodeConfig =
      type === ADD_TYPE.Parallel
        ? { ...root, childNode: [...(childNode || []), newNode] }
        : { ...root, childNode: [{ ...newNode, childNode }] }
    updateNode(newRoot)
  }

  return (
    <div className="add-node-btn-box">
      <div className="add-node-btn">
        <button
          className="w-8 h-8 flex items-center justify-center bg-white shadow-md rounded-full"
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          <svg
            width="16px"
            height="16px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 3a1 1 0 0 1 1 1v16a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Z"
              fill="#3370ff"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 12a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Z"
              fill="#3370ff"
            ></path>
          </svg>
        </button>
        <AddNodePopover
          isOpen={isOpenMenu}
          onClose={() => setIsOpenMenu(false)}
          onAddNode={handleSelectNode}
        />
      </div>
    </div>
  )
}

export default AddNode
