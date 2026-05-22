export interface FlowOption {
  label: string
  nextId: string
}

export interface FlowPosition {
  x: number
  y: number
}

export interface FlowNode {
  id: string
  type: 'start' | 'question' | 'end'
  text: string
  position: FlowPosition
  options: FlowOption[]
}

export interface FlowData {
  meta: {
    theme: string
    canvas_size: {
      w: number
      h: number
    }
  }
  nodes: FlowNode[]
}