# SupportFlow Visual Builder

A visual decision tree editor for building and managing automated customer support bots. Non-technical managers can construct, edit, and test conversation flows through an intuitive flowchart interface — no spreadsheets, no developers required.

---

## Live Demo

🔗 https://support-flow-visual-builder-taupe.vercel.app/

---

## Design File

🎨 https://www.figma.com/design/8GGtwAuB2bnHiSMfgzZVF5/SupportFlow?node-id=4-3&t=H4nGvQVxTCSeFQsC-1
---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Design System](#design-system)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Wildcard Feature](#wildcard-feature)
- [Architectural Decisions](#architectural-decisions)

---

## Overview

SupportFlow's support teams previously configured their Help Bots through Excel spreadsheets — a process that was error-prone, hard to visualize, and completely inaccessible to non-technical managers. This tool replaces that workflow entirely.

The Visual Builder renders conversation logic as an interactive flowchart, lets managers edit bot responses in real time, and includes a built-in Preview Mode so they can simulate the customer experience before anything goes live — all without writing a single line of code.

---

## Features

### Visual Graph

The canvas renders all conversation nodes from the source JSON, positioned absolutely using each node's `x/y` coordinates. Parent and child nodes are connected by SVG bezier curves that update dynamically as the graph changes. All connection and layout logic is built from scratch using raw DOM coordinates — no graph libraries used.

### Real-Time Editor

Clicking any node opens a side panel where managers can update the question text. Changes reflect on the canvas immediately without any page reload or manual refresh.

### Preview Mode

A Play button switches the UI from the flowchart editor into a chat-style interface that simulates the real customer bot experience. The runner starts at the root node, traverses the graph as the user selects answers, and displays a Restart option when a terminal node is reached.

### Draggable Nodes

Nodes can be freely repositioned on the canvas by dragging. SVG connector lines recalculate in real time as nodes move, keeping the graph visually accurate at all times.

### Canvas Pan & Zoom

The canvas supports mouse-based panning and scroll-based zooming, enabling managers to navigate large and complex flows comfortably without losing spatial context.

### Undo / Redo

A full history stack tracks every state-changing action. Managers can undo mistakes and redo changes, giving them a reliable safety net when editing live flows.

### Full Node Lifecycle Management (Add & Delete)

See the [Wildcard Feature](#wildcard-feature) section for the full rationale.

---

## Design System

The design system is documented in the [Figma file](https://www.figma.com/proto/8GGtwAuB2bnHiSMfgzZVF5/SupportFlow?node-id=0-1&t=H4nGvQVxTCSeFQsC-1) and covers four core elements:

**Canvas** — the workspace where nodes live. Dark-themed background with subtle visual depth to reduce eye strain during extended editing sessions.

**Node Cards** — color-coded by type to communicate state at a glance:
- `start` — green accent, signals the entry point of the conversation
- `question` — blue accent, signals a decision branch with multiple paths
- `end` — red accent, signals a terminal state with no further options

**Connectors** — SVG bezier curves drawn from the bottom of each parent node to the top of its child, labeled with the option text that triggers traversal along that path.

**Color Semantics** — a deliberate, consistent palette that lets managers read the structure of a flow visually before reading a single word of text.

---

## Tech Stack

React + TypeScript 
Styling - Tailwind CSS 
State Management - Zustand 
Icons - Lucide React 
Graph Rendering - Custom SVG 
Deployment  - Vercel(https://vercel.com) |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/SupportFlow-Visual-Builder.git

# Navigate into the project
cd SupportFlow-Visual-Builder

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

To build for production:

```bash
npm run build
```

---

## Project Structure

```text
src/
├── components/
│   ├── atoms/                  # Base UI primitives
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Typography/
│   ├── molecules/              # Composed UI units
│   │   ├── ChatBubble/
│   │   ├── NodeAnswers/
│   │   └── NodeHeader/
│   ├── organisms/              # Feature-level components
│   │   ├── Canvas/             # Flowchart canvas and pan/zoom logic
│   │   ├── EdgeLayer/          # SVG connector drawing and recalculation
│   │   ├── EditPanel/          # Node text editor side panel
│   │   ├── Footer/
│   │   ├── Header/
│   │   └── NodeCard/           # Individual node rendering and drag behavior
│   └── pages/
│       ├── BuilderPage/        # Editor view (flowchart)
│       └── PreviewPage/        # Preview mode (chat runner)
├── data/                       # Source flow JSON
├── store/                      # Zustand store — nodes, history, UI state
├── types/                      # TypeScript interfaces and types
├── App.tsx
├── index.css
└── main.tsx
```

The component architecture follows atomic design principles: atoms are stateless primitives, molecules combine atoms into reusable units, and organisms contain the business logic and feature complexity.

---

## Wildcard Feature

### Full Node Lifecycle Management — Add & Delete

The core editor requirement covers one action: updating the text of an existing node. That scope is a practical baseline, but it leaves the tool critically incomplete for real-world use.


The project introduces dynamic node creation as the wildcard feature.

This allows support managers to extend conversation flows directly inside the editor.Instead of being limited to editing existing support flows, teams can create entirely new customer support branches visually.

#### Business Value

This feature improves operational flexibility by allowing non-technical teams to:
- Adapt workflows as policies change
- Add new support scenarios quickly
- Scale chatbot coverage without engineering intervention





