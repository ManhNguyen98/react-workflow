import clsx from 'clsx'
import AddBranch from './components/AddBranch'
import AddNode from './components/AddNode'
import Card from './components/Card'
import { bgColors, placeHolders } from './constant'
import { NODE_TYPE, NodeConfig } from './type'

interface Props {
  node?: NodeConfig
  updateNode: (node: NodeConfig) => void
}
const Flow: React.FC<Props> = ({ node, updateNode }) => {
  if (!node) return null

  const updateChildNode = (childNode: NodeConfig, index?: number) => {
    if (typeof index === 'number') {
      const { conditionNodes } = node
      if (conditionNodes) {
        conditionNodes[index].childNode = [childNode]
        updateNode({ ...node, conditionNodes })
      }
    } else {
      updateNode({ ...node, childNode: [childNode] })
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

  const addNodeParallel = () => {
    if (node.childNode) {
      node.childNode.push({
        nodeName: 'Approval',
        type: NODE_TYPE.APPROVAL,
        childNode: null,
        nodeUserList: [],
      })
      updateNode(node)
    }
  }

  const getNode = (node: NodeConfig) => {
    switch (node.type) {
      case NODE_TYPE.INITIATOR:
      case NODE_TYPE.APPROVAL:
      case NODE_TYPE.FORWARD:
      case NODE_TYPE.HANDLER:
        return (
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
            <AddNode
              root={node}
              childNode={node.childNode}
              updateNode={updateNode}
            />
          </div>
        )
      case NODE_TYPE.ROUTING:
        return (
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
                            root={item}
                            childNode={item.childNode}
                            updateNode={(node) => updateChildNode(node, index)}
                          />
                        </div>
                      </div>
                      {item.childNode
                        ? item.childNode.map((item, index) => (
                            <Flow
                              key={index}
                              node={item}
                              updateNode={(node) =>
                                updateChildNode(node, index)
                              }
                            />
                          ))
                        : null}
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
              <AddNode
                root={node}
                childNode={node.childNode}
                updateNode={(node) => updateChildNode(node)}
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderChildren = () => {
    if (!node.childNode) return null
    if (node.childNode?.length === 1) {
      return <Flow node={node.childNode[0]} updateNode={updateChildNode} />
    }
    return (
      <div className="parallel-wrap">
        <div className="parallel-box-wrap">
          <div className="parallel-box">
            <button className="add-branch" onClick={addNodeParallel}>
              Add parallel
            </button>
            {node.childNode?.map((item, index) => (
              <div className="col-box" key={index}>
                <div className="py-10">
                  <Flow node={item} updateNode={updateChildNode} />
                </div>
                {index == 0 ? (
                  <>
                    <div className="top-left-cover-line"></div>
                    <div className="bottom-left-cover-line"></div>
                  </>
                ) : null}
                {node?.childNode && index == node.childNode.length - 1 ? (
                  <>
                    <div className="top-right-cover-line"></div>
                    <div className="bottom-right-cover-line"></div>
                  </>
                ) : null}
              </div>
            ))}
          </div>
          <AddNode
            root={node}
            childNode={node.childNode}
            updateNode={(node) => updateChildNode(node)}
          />
        </div>
      </div>
    )
  }

  if (!node.childNode?.length) {
    getNode(node)
  }

  return (
    <>
      {getNode(node)}
      {renderChildren()}
    </>
  )
}

export default Flow
