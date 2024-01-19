export type EmptyType<T> = T | ''

export enum ADD_TYPE {
  Sequential,
  Parallel,
}

export enum NODE_TYPE {
  INITIATOR = 0,
  APPROVAL = 1,
  FORWARD = 2,
  CONDITIONS = 3,
  ROUTING = 4,
  HANDLER = 5,
}

export enum SET_TYPE {
  SpecificMember = 1,
  Supervisor = 2,
  InitiatorsChoice = 4,
  InitiatorThemselves = 5,
  ConsecutiveMultiLevelSupervisors = 7,
}

export enum SELECT_MODE {
  None = 0,
  Single = 1,
  Multiple = 2,
}

export enum SELECT_RANGE {
  None = 0,
  EntityCompany = 1,
  SpecificMember = 2,
  SpecificRole = 3,
}

export enum EXAMINE_MODE {
  Sequential = 1,
  Countersigning = 2,
}

export enum NO_HANDLER_ACTION {
  Auto = 1,
  AdminReview = 2,
}

export interface Condition {}

export interface User {}

export interface NodeConfig {
  nodeName: string
  type: NODE_TYPE
  priorityLevel?: EmptyType<number>
  setType?: EmptyType<SET_TYPE>
  selectMode?: EmptyType<SELECT_MODE>
  selectRange?: EmptyType<SELECT_RANGE>
  directorLevel?: EmptyType<number>
  examineMode?: EmptyType<EXAMINE_MODE>
  noHandlerAction?: EmptyType<NO_HANDLER_ACTION>
  examineEndDirectorLevel?: EmptyType<number>
  ccSelfSelectFlag?: EmptyType<number>
  conditionList?: Condition[]
  nodeUserList: User[]
  conditionNodes?: NodeConfig[]
  childNode: NodeConfig[] | null
  error?: boolean
}

export interface WorkFlow {
  tableId?: EmptyType<number>
  workFlowDef?: {
    name: string
  }
  directorMaxLevel?: EmptyType<number>
  flowPermission?: User[]
  nodeConfig?: NodeConfig
}

export enum ZOOM_TYPE {
  IN,
  OUT,
}
