import './App.css'
import Editor from './Editor'
import { EditorProvider } from './useEditor'
import { WorkflowProvider } from './useWorkflow'

function App() {
  return (
    <WorkflowProvider>
      <EditorProvider>
        <Editor />
      </EditorProvider>
    </WorkflowProvider>
  )
}

export default App
