import clsx from 'clsx'
import AddBranch from './components/AddBranch'
import AddNode from './components/AddNode'
import Card from './components/Card'
import { bgColors, placeHolders } from './constant'
import { NODE_TYPE, NodeConfig } from './type'

interface Props {
  node?: NodeConfig
  updateNode: (node: NodeConfig | null) => void
}
const Flow: React.FC<Props> = ({ node, updateNode }) => {
  if (!node) return null

  const updateChildNode = (
    newNode: NodeConfig | null,
    index?: number,
    indexChild?: number
  ) => {
    console.log('🚀 ~ indexChild:', indexChild)
    console.log('🚀 ~ index:', index)
    console.log('🚀 ~ newNode:', newNode)
    console.log('🚀 ~ node:', node)
    if (!newNode) {
      // Handle delete node
      if (index === undefined && indexChild === undefined) {
        node.childNode = null
      }
      if (typeof index === 'number' && typeof indexChild === 'number') {
        if (node.type === NODE_TYPE.ROUTING) {
          const { conditionNodes } = node
          if (conditionNodes) {
            conditionNodes[index]?.childNode?.splice(indexChild, 1)
            node.conditionNodes = conditionNodes
          }
        } else {
          node.childNode?.splice(indexChild, 1)
        }
      }
      updateNode(node)
      return
    }
    if (
      newNode.type === NODE_TYPE.ROUTING &&
      newNode.conditionNodes?.length === 1
    ) {
      if (typeof indexChild === 'number' && typeof index === 'number') {
        node.childNode?.splice(indexChild, 1)
        if (newNode.childNode) {
          node.childNode = [...node.childNode!, ...newNode.childNode]
        }
      } else {
        node.childNode = newNode.childNode
      }
      updateNode(node)
      return
    }
    if (typeof index === 'number') {
      const { conditionNodes } = node
      if (conditionNodes && conditionNodes.length) {
        if (newNode.type === NODE_TYPE.CONDITIONS) {
          conditionNodes[index] = newNode
        } else {
          conditionNodes[index].childNode![indexChild!] = newNode
        }
        updateNode({ ...node, conditionNodes })
      } else {
        if (typeof indexChild === 'number') {
          node.childNode![indexChild] = newNode
          updateNode({ ...node, childNode: node.childNode })
        }
      }
    } else {
      if (newNode.type === NODE_TYPE.INITIATOR) {
        updateNode(newNode)
      } else {
        updateNode({ ...node, childNode: [newNode] })
      }
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

  const deleteNode = () => {
    updateNode(node.childNode ? { ...node.childNode[0] } : null)
  }

  const deleteCondition = (index: number) => {
    node.conditionNodes?.splice(index, 1)
    node.conditionNodes?.map((item, index) => {
      item.priorityLevel = index + 1
      item.nodeName = `Condition ${index + 1}`
    })
    updateNode(node)
  }

  const renderConditionChild = (nodes: NodeConfig[] | null, index: number) => {
    if (!nodes || !nodes.length) return null
    if (nodes.length === 1) {
      return (
        <Flow
          node={nodes[0]}
          updateNode={(node) => {
            updateChildNode(node, index, 0)
          }}
        />
      )
    }
    return (
      <div className="parallel-wrap">
        <div className="parallel-box-wrap">
          <div className="parallel-box">
            {nodes.map((node, indexChild) => (
              <div className="col-box" key={indexChild}>
                <div className="py-10">
                  <Flow
                    node={node}
                    updateNode={(newNode) =>
                      updateChildNode(newNode, index, indexChild)
                    }
                  />
                </div>
                {indexChild == 0 ? (
                  <>
                    <div className="top-left-cover-line"></div>
                    <div className="bottom-left-cover-line"></div>
                  </>
                ) : null}
                {indexChild == nodes.length - 1 ? (
                  <>
                    <div className="top-right-cover-line"></div>
                    <div className="bottom-right-cover-line"></div>
                  </>
                ) : null}
              </div>
            ))}
          </div>
          <div style={{ padding: '30px 0' }} />
        </div>
      </div>
    )
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
                {...(node.type !== NODE_TYPE.INITIATOR && {
                  onDelete: deleteNode,
                })}
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
                              key={index}
                              name={item.nodeName}
                              bgColor={bgColors[item.type]}
                              titleColor="#2eb795"
                              placeholder={placeHolders[item.type]}
                              onDelete={() => deleteCondition(index)}
                            />
                          </div>
                          <AddNode
                            root={item}
                            childNode={item.childNode}
                            updateNode={(node) => updateChildNode(node, index)}
                          />
                        </div>
                      </div>
                      {renderConditionChild(item.childNode, index)}
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
                updateNode={updateNode}
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
    if (node.childNode.length === 0) return null
    if (node.childNode?.length === 1) {
      return <Flow node={node.childNode[0]} updateNode={updateChildNode} />
    }
    return (
      <div className="parallel-wrap">
        <div className="parallel-box-wrap">
          <div className="parallel-box">
            {node.childNode?.map((item, index) => (
              <div className="col-box" key={index}>
                <div className="py-10">
                  <Flow
                    node={item}
                    updateNode={(node) => updateChildNode(node, 0, index)}
                  />
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
          <div className="add-node-btn-box" style={{ padding: '30px 0' }}></div>
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
