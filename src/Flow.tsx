import AddBranch from './components/AddBranch'
import AddNode from './components/AddNode'
import Card from './components/Card'
import { bgColors, placeHolders } from './constant'
import { NODE_TYPE, WorkFlow } from './type'

interface Props {
  node: WorkFlow['nodeConfig']
}
const Flow: React.FC<Props> = ({ node }) => {
  if (!node) return null

  let children = null

  if (
    node?.type === NODE_TYPE.INITIATOR ||
    node?.type === NODE_TYPE.APPROVAL ||
    node?.type === NODE_TYPE.FORWARD ||
    node?.type === NODE_TYPE.HANDLER
  ) {
    children = (
      <div className="flow-wrap flex flex-col gap-4">
        <Card
          name={node.nodeName}
          placeholder={placeHolders[node.type]}
          bgColor={bgColors[node.type]}
        />
        <AddNode />
      </div>
    )
  }

  if (node.type === NODE_TYPE.ROUTING) {
    children = (
      <div className="branch-wrap">
        <div className="branch-box-wrap">
          <div className="branch-box">
            <AddBranch />
            {node.conditionNodes?.map((item, index) => {
              return (
                <div className="col-box" key={index}>
                  <div className="condition-node">
                    <div className="condition-node-box">
                      <Card
                        name={item.nodeName}
                        bgColor={bgColors[item.type]}
                        titleColor="#2eb795"
                        placeholder={placeHolders[item.type]}
                        key={index}
                      />
                    </div>
                  </div>
                  {item.childNode ? <Flow node={item.childNode} /> : null}
                </div>
              )
            })}
          </div>
          <AddNode />
        </div>
      </div>
    )
  }

  return (
    <>
      {children}
      {node.childNode ? <Flow node={node.childNode} /> : null}
    </>
  )
}

export default Flow
