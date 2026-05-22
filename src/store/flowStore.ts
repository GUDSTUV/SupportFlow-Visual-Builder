import { create } from 'zustand'
import flowDataRaw from '../data/flow_data.json'
import type { FlowData, FlowNode } from '../types/flow'

const flowData = flowDataRaw as FlowData

interface FlowStore {
  nodes: FlowNode[]
  selectedNode: FlowNode | null
  mode: 'editor' | 'preview'
}

export const useFlowStore = create<FlowStore>(() => ({
  nodes: flowData.nodes,
  selectedNode: null,
  mode: 'editor',
}))