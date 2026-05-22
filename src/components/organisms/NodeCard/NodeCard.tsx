import type { FlowNode } from '../../../types/flow'

interface Props {
  node: FlowNode
}

export default function NodeCard({ node }: Props) {
  return (
    <div
      className="absolute bg-white border shadow-md rounded-lg p-3 w-64"
      style={{
        left: node.position.x,
        top: node.position.y,
      }}
    >
      <div className="text-xs font-semibold text-slate-400 uppercase">
        {node.type}
      </div>

      <h3 className="font-medium text-sm text-slate-800 mt-1">
        {node.text}
      </h3>

      <div className="mt-2 space-y-1">
        {node.options.map((opt, i) => (
          <div
            key={i}
            className="text-xs bg-slate-100 px-2 py-1 rounded cursor-pointer"
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  )
}