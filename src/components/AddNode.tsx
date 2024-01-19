import { useRef, useState } from 'react'
import useVirtualBackdrop from '../useVirtualBackdrop'
import useCaptureEscKey from '../useCaptureEscKey'
import { NODE_TYPE, NodeConfig } from '../type'
import { defaultNodes, nodeNames } from '../constant'
import { updateObject } from '../utils'

interface Props {
  childNode: NodeConfig | null
  updateNode: (node: NodeConfig) => void
}

const AddNode: React.FC<Props> = ({ childNode, updateNode }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const menuRef = useRef(null)

  const handleSelectNode = (
    type: Exclude<NODE_TYPE, NODE_TYPE.CONDITIONS | NODE_TYPE.INITIATOR>
  ) => {
    setIsOpenMenu(false)
    let newNode
    if (type === NODE_TYPE.ROUTING) {
      newNode = updateObject(newNode, {
        nodeNames: nodeNames[type],
        type,
        childNode: null,
        conditionNodes: [
          {
            nodeName: 'Condition 1',
            type: NODE_TYPE.CONDITIONS,
            priorityLevel: 1,
            conditionList: [],
            nodeUserList: [],
            childNode,
          },
          {
            nodeName: 'Condition 2',
            type: NODE_TYPE.CONDITIONS,
            priorityLevel: 2,
            conditionList: [],
            nodeUserList: [],
            childNode: null,
          },
        ],
      })
    } else {
      newNode = { ...(defaultNodes[type] || {}), childNode }
    }

    updateNode(newNode)
  }

  const renderMenu = () => {
    const options: Exclude<
      NODE_TYPE,
      NODE_TYPE.CONDITIONS | NODE_TYPE.INITIATOR
    >[] = [
      NODE_TYPE.APPROVAL,
      NODE_TYPE.FORWARD,
      NODE_TYPE.HANDLER,
      NODE_TYPE.ROUTING,
    ]
    if (!isOpenMenu) return null
    return (
      <div className="add-node-menu" ref={menuRef}>
        <div className="backdrop" onMouseDown={(e) => e.preventDefault()} />
        <div className="add-node-menu-box">
          {options.map((type) => (
            <button key={type} onClick={() => handleSelectNode(type)}>
              {nodeNames[type]}
            </button>
          ))}
        </div>
      </div>
    )
  }

  useVirtualBackdrop(isOpenMenu, menuRef, () => setIsOpenMenu(false))

  useCaptureEscKey(isOpenMenu, () => setIsOpenMenu(false))

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
        {renderMenu()}
      </div>
    </div>
  )
}

export default AddNode
