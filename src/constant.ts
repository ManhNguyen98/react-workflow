import {
  EXAMINE_MODE,
  NODE_TYPE,
  NO_HANDLER_ACTION,
  SELECT_MODE,
  SELECT_RANGE,
  SET_TYPE,
  WorkFlow,
} from './type'

export const WF_INIT_DATA: WorkFlow = {
  tableId: 1,
  workFlowDef: {
    name: 'Test',
  },
  directorMaxLevel: 4,
  flowPermission: [],
  nodeConfig: {
    nodeName: 'Submit',
    type: 0,
    priorityLevel: '',
    setType: '',
    selectMode: '',
    selectRange: '',
    directorLevel: '',
    examineMode: '',
    noHandlerAction: '',
    examineEndDirectorLevel: '',
    ccSelfSelectFlag: '',
    conditionList: [],
    nodeUserList: [],
    childNode: [
      {
        nodeName: 'Approval',
        error: false,
        type: 1,
        setType: 2,
        selectMode: 0,
        selectRange: 0,
        directorLevel: 1,
        examineMode: 1,
        noHandlerAction: 2,
        examineEndDirectorLevel: 0,
        childNode: null,
        // childNode: [
        //   {
        //     nodeName: 'Routing',
        //     type: 4,
        //     priorityLevel: 1,
        //     setType: 1,
        //     selectMode: 0,
        //     selectRange: 0,
        //     directorLevel: 1,
        //     examineMode: 1,
        //     noHandlerAction: 2,
        //     examineEndDirectorLevel: 1,
        //     ccSelfSelectFlag: 1,
        //     conditionList: [],
        //     nodeUserList: [],
        //     childNode: [
        //       {
        //         nodeName: 'CC',
        //         type: 2,
        //         ccSelfSelectFlag: 1,
        //         childNode: null,
        //         nodeUserList: [],
        //         error: false,
        //       },
        //       // {
        //       //   nodeName: 'Approval copy',
        //       //   type: NODE_TYPE.APPROVAL,
        //       //   childNode: null,
        //       //   error: false,
        //       //   nodeUserList: [],
        //       // },
        //     ],
        //     conditionNodes: [
        //       {
        //         //条件节点
        //         nodeName: 'Condition 1',
        //         type: 3,
        //         priorityLevel: 1,
        //         setType: 1,
        //         selectMode: 0,
        //         selectRange: 0,
        //         directorLevel: 1,
        //         examineMode: 1,
        //         noHandlerAction: 2,
        //         examineEndDirectorLevel: 1,
        //         ccSelfSelectFlag: 1,
        //         conditionList: [],
        //         nodeUserList: [],
        //         childNode: [
        //           {
        //             nodeName: 'Approval',
        //             type: 1,
        //             priorityLevel: 1,
        //             setType: 1,
        //             selectMode: 0,
        //             selectRange: 0,
        //             directorLevel: 1,
        //             examineMode: 1,
        //             noHandlerAction: 2,
        //             examineEndDirectorLevel: 1,
        //             ccSelfSelectFlag: 1,
        //             conditionList: [],
        //             nodeUserList: [],
        //             childNode: null,
        //             conditionNodes: [],
        //             error: false,
        //           },
        //         ],
        //         conditionNodes: [],
        //         error: false,
        //       },
        //       {
        //         nodeName: 'Condition 2',
        //         type: 3,
        //         priorityLevel: 2,
        //         setType: 1,
        //         selectMode: 0,
        //         selectRange: 0,
        //         directorLevel: 1,
        //         examineMode: 1,
        //         noHandlerAction: 2,
        //         examineEndDirectorLevel: 1,
        //         ccSelfSelectFlag: 1,
        //         conditionList: [],
        //         nodeUserList: [],
        //         childNode: null,
        //         conditionNodes: [],
        //         error: false,
        //       },
        //     ],
        //   },
        // ],
        nodeUserList: [],
      },
      // {
      //   nodeName: 'Approval copy',
      //   type: NODE_TYPE.APPROVAL,
      //   childNode: null,
      //   error: false,
      //   nodeUserList: [],
      // },
    ],
    conditionNodes: [],
  },
}

export const bgColors = {
  [NODE_TYPE.INITIATOR]: '#a9b4cd',
  [NODE_TYPE.APPROVAL]: '#f80',
  [NODE_TYPE.FORWARD]: '#3370ff',
  [NODE_TYPE.HANDLER]: '#935af6',
  [NODE_TYPE.CONDITIONS]: '#fff',
  [NODE_TYPE.ROUTING]: '#fff',
}

export const placeHolders = {
  [NODE_TYPE.INITIATOR]: 'Choose to set notification',
  [NODE_TYPE.APPROVAL]: 'Set approver',
  [NODE_TYPE.FORWARD]: 'Set cc receiver',
  [NODE_TYPE.HANDLER]: 'Set Handler',
  [NODE_TYPE.CONDITIONS]: 'Set conditions',
  [NODE_TYPE.ROUTING]: '',
}

export const nodeNames = {
  [NODE_TYPE.INITIATOR]: 'Submit',
  [NODE_TYPE.APPROVAL]: 'Approval',
  [NODE_TYPE.FORWARD]: 'CC',
  [NODE_TYPE.HANDLER]: 'Handle',
  [NODE_TYPE.CONDITIONS]: 'Condition',
  [NODE_TYPE.ROUTING]: 'Conditional branch',
}

export const defaultNodes = {
  [NODE_TYPE.APPROVAL]: {
    nodeName: nodeNames[NODE_TYPE.APPROVAL],
    type: NODE_TYPE.APPROVAL,
    setType: SET_TYPE.SpecificMember,
    selectMode: SELECT_MODE.None,
    selectRange: SELECT_RANGE.None,
    directorLevel: 1,
    examineMode: EXAMINE_MODE.Sequential,
    noHandlerAction: NO_HANDLER_ACTION.Auto,
    examineEndDirectorLevel: 0,
    nodeUserList: [],
  },
  [NODE_TYPE.FORWARD]: {
    nodeName: nodeNames[NODE_TYPE.FORWARD],
    type: NODE_TYPE.FORWARD,
    ccSelfSelectFlag: 1,
    nodeUserList: [],
  },
  [NODE_TYPE.HANDLER]: {
    nodeName: nodeNames[NODE_TYPE.HANDLER],
    type: NODE_TYPE.HANDLER,
    nodeUserList: [],
  },
}
