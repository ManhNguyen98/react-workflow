import Flow from './Flow'
import Zoom from './Zoom'
import Card from './components/Card'
import { useEditor } from './useEditor'
import { useWorkflowControls, useWorkflowState } from './useWorkflow'

const Editor = () => {
  const { size } = useEditor()
  const { nodeConfig } = useWorkflowState()
  console.log('🚀 ~ Editor ~ nodeConfig:', nodeConfig)
  const { updateNode } = useWorkflowControls()

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 overflow-x-hidden overflow-y-auto pb-8">
      <div className="editor">
        <Zoom />
        <div
          className="box-scale"
          style={{ transform: `scale(${size / 100})` }}
        >
          <div className="flow-box">
            <Flow node={nodeConfig} updateNode={updateNode} />
            <div className="end-node">
              <Card
                name="End"
                placeholder="Choose to set notification"
                bgColor="#a9b4cd"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
