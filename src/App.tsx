import { useFlowStore } from './store/flowStore'

export default function App() {
  const nodes = useFlowStore(state => state.nodes)

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Nodes Loaded:</h1>
      <pre>{JSON.stringify(nodes, null, 2)}</pre>
    </div>
  )
}