# React Flow

`Ostara` 使用 `React Flow` 来构建 `Bean` 依赖图。

## ReactFlowContext

`ReactFlowContext` 作为对 `React Flow` 的封装和增强，结构如下：

- `nodes` 节点信息
- `edges` 连线信息
- `initialSelectedNode` 初始化已选择的节点
- `search` 搜索，对于匹配 beanName 进行高亮和展示
- `selectedNode` 已选择的 Node
- `incomingNodeIds`
- `outgodingNodeIds`
- `layoutData`

## GraphComponent

`GraphComponent` 是一个标准组件，由一下内容组成：

- `SearchToolbar` 搜索框
- `CustomReactFlow` React Flow 图表

## CustomReactFlow

`CustomReactFlow` 是展示 `React Flow` 图信息的核心组件。

- `nodes` 节点
- `edges` 连接线
- `nodeTypes` 节点类型，只有 CustomNode
- `nodesConnectable` 控制节点是否可链接，由于是对已有数据进行展示，不可更改，因此该项为 false
- `nodesDraggable` 控制所有节点是否可拖动，为了保持大量数据的情况下的结构稳定，因此该项为 false
- `elementsSelectable` 控制是否允许选择 Node 和 Edge
- `selectionOnDrag` 控制是否允许使用选择框来拖动，为了保持大量数据的情况下的结构稳定，因此该项为 false
- `proOptions`
- `onInit`
- `onNodeClick` 点击节点的事件回调，将设置 selectedNode = node
- `onPaneClick` 点击窗格内的非节点部分，将设置 selectedNode = undefined
- `fitView`
- `minZoom`
- `maxZoom`
- `Background`
- `MiniMap`
- `ControlsStyled`

## CustomNode

`CustomNode` 是自定义的 Node。

- `selected` 节点是否被选择
- `incoming` 是否作为流入节点，未被选择，且流入节点列表中包含该节点
- `outgoing` 是否作为流出节点，未被选择，且流出节点列表中包含该节点
- `highlight` 未被选择，未作为流入节点，未作为流出节点，且是高亮节点
- `translucent` 是否为半透明

结构组成为：

- `Handle` 连接线
- `Typography` Bean 名称
- `Handle` 连接线
- `InlineCodeLabel` Bean 的 package 信息
