import clsx from 'clsx'
import AddBranch from './components/AddBranch'
import AddNode from './components/AddNode'
import Card from './components/Card'
import { bgColors, placeHolders } from './constant'
import { NODE_TYPE, NodeConfig, WorkFlow } from './type'

interface Props {
  node: WorkFlow['nodeConfig']
  updateNode: (node: NodeConfig) => void
}
const Flow: React.FC<Props> = ({ node, updateNode }) => {
  if (!node) return null

  let children = null

  const updateChildNode = (childNode: NodeConfig, index?: number) => {
    if (typeof index === 'number') {
      const { conditionNodes } = node
      if (conditionNodes) {
        conditionNodes[index].childNode = childNode
        updateNode({ ...node, conditionNodes })
      }
    } else {
      updateNode({ ...node, childNode })
    }
  }

  const addBranch = () => {
    if (node.conditionNodes?.length) {
      const len = node.conditionNodes.length + 1
      node.conditionNodes.push({
        nodeName: `Condition ${len}`,
        type: NODE_TYPE.CONDITIONS,
        priorityLevel: len,
        conditionList: [],
        nodeUserList: [],
        childNode: null,
      })
      updateNode(node)
    }
  }

  if (
    node?.type === NODE_TYPE.INITIATOR ||
    node?.type === NODE_TYPE.APPROVAL ||
    node?.type === NODE_TYPE.FORWARD ||
    node?.type === NODE_TYPE.HANDLER
  ) {
    children = (
      <div className="flow-wrap">
        <div
          className={clsx('flow-wrap-box', {
            'start-node': node.type === NODE_TYPE.INITIATOR,
          })}
        >
          <Card
            name={node.nodeName}
            placeholder={placeHolders[node.type]}
            bgColor={bgColors[node.type]}
          />
        </div>
        <AddNode childNode={node.childNode} updateNode={updateChildNode} />
      </div>
    )
  }

  if (node.type === NODE_TYPE.ROUTING) {
    children = (
      <div className="branch-wrap">
        <div className="branch-box-wrap">
          <div className="branch-box">
            <AddBranch onClick={addBranch} />
            {node.conditionNodes?.map((item, index) => {
              return (
                <div className="col-box" key={index}>
                  <div className="condition-node">
                    <div className="condition-node-box-wrap">
                      <div className="condition-node-box">
                        <Card
                          name={item.nodeName}
                          bgColor={bgColors[item.type]}
                          titleColor="#2eb795"
                          placeholder={placeHolders[item.type]}
                          key={index}
                        />
                      </div>
                      <AddNode
                        childNode={item.childNode}
                        updateNode={(node) => updateChildNode(node, index)}
                      />
                    </div>
                  </div>
                  {item.childNode ? (
                    <Flow
                      node={item.childNode}
                      updateNode={(node) => updateChildNode(node, index)}
                    />
                  ) : null}
                  {index == 0 ? (
                    <>
                      <div className="top-left-cover-line"></div>
                      <div className="bottom-left-cover-line"></div>
                    </>
                  ) : null}
                  {node?.conditionNodes &&
                  index == node.conditionNodes.length - 1 ? (
                    <>
                      <div className="top-right-cover-line"></div>
                      <div className="bottom-right-cover-line"></div>
                    </>
                  ) : null}
                </div>
              )
            })}
          </div>
          <AddNode childNode={node.childNode} updateNode={updateChildNode} />
        </div>
      </div>
    )
  }

  return (
    <>
      {children}
      {node.childNode ? (
        <Flow node={node.childNode} updateNode={updateChildNode} />
      ) : null}
    </>
  )
}

export default Flow
