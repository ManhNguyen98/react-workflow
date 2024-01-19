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
  tableId: 1, //审批id
  workFlowDef: {
    name: 'Test', //审批名称
  },
  directorMaxLevel: 4, //审批主管最大层级
  flowPermission: [], //发起人
  nodeConfig: {
    nodeName: 'Submit', //节点名称
    type: 0, // 0 发起人 1审批 2抄送 3条件 4路由
    priorityLevel: '', // 条件优先级
    setType: '', // 审批人设置 1指定成员 2主管 4发起人自选 5发起人自己 7连续多级主管
    selectMode: '', //审批人数 1选一个人 2选多个人
    selectRange: '', //选择范围 1.全公司 2指定成员 2指定角色
    directorLevel: '', //审批终点  最高层主管数
    examineMode: '', //多人审批时采用的审批方式 1依次审批 2会签
    noHandlerAction: '', //审批人为空时 1自动审批通过/不允许发起 2转交给审核管理员
    examineEndDirectorLevel: '', //审批终点 第n层主管
    ccSelfSelectFlag: '', //允许发起人自选抄送人
    conditionList: [], //当审批单同时满足以下条件时进入此流程
    nodeUserList: [], //操作人
    childNode: [
      {
        nodeName: 'Approval',
        error: false, //当前审批是否通过校验
        type: 1,
        setType: 2,
        selectMode: 0,
        selectRange: 0,
        directorLevel: 1,
        examineMode: 1,
        noHandlerAction: 2,
        examineEndDirectorLevel: 0,
        childNode: [
          {
            nodeName: 'Routing',
            type: 4,
            priorityLevel: 1,
            setType: 1,
            selectMode: 0,
            selectRange: 0,
            directorLevel: 1,
            examineMode: 1,
            noHandlerAction: 2,
            examineEndDirectorLevel: 1,
            ccSelfSelectFlag: 1,
            conditionList: [],
            nodeUserList: [],
            childNode: [
              {
                nodeName: 'CC',
                type: 2,
                ccSelfSelectFlag: 1,
                childNode: null,
                nodeUserList: [],
                error: false,
              },
            ],
            conditionNodes: [
              {
                //条件节点
                nodeName: 'Condition 1',
                type: 3,
                priorityLevel: 1,
                setType: 1,
                selectMode: 0,
                selectRange: 0,
                directorLevel: 1,
                examineMode: 1,
                noHandlerAction: 2,
                examineEndDirectorLevel: 1,
                ccSelfSelectFlag: 1,
                conditionList: [
                  {
                    //当前条件
                    columnId: 0, //发起人
                    type: 1, //1 发起人 2其他
                    optType: '', //["", "<", ">", "≤", "=", "≥"][optType]
                    zdy1: '', //左侧自定义内容
                    zdy2: '', //右侧自定义内容
                    opt1: '', //左侧符号 < ≤
                    opt2: '', //右侧符号 < ≤
                    columnDbname: '', //条件字段名称
                    columnType: '', //条件字段类型
                    showType: '', //3多选 其他
                    showName: '', //展示名
                    fixedDownBoxValue: '', //多选数组
                  },
                ],
                nodeUserList: [
                  {
                    targetId: 85,
                    type: 1,
                    name: '天旭',
                  },
                ],
                childNode: [
                  {
                    nodeName: 'Approval',
                    type: 1,
                    priorityLevel: 1,
                    setType: 1,
                    selectMode: 0,
                    selectRange: 0,
                    directorLevel: 1,
                    examineMode: 1,
                    noHandlerAction: 2,
                    examineEndDirectorLevel: 1,
                    ccSelfSelectFlag: 1,
                    conditionList: [],
                    nodeUserList: [
                      {
                        targetId: 2515744,
                        type: 1,
                        name: '哈哈哈哈',
                      },
                    ],
                    childNode: null,
                    conditionNodes: [],
                    error: false,
                  },
                ],
                conditionNodes: [],
                error: false,
              },
              {
                nodeName: 'Condition 2',
                type: 3,
                priorityLevel: 2,
                setType: 1,
                selectMode: 0,
                selectRange: 0,
                directorLevel: 1,
                examineMode: 1,
                noHandlerAction: 2,
                examineEndDirectorLevel: 1,
                ccSelfSelectFlag: 1,
                conditionList: [],
                nodeUserList: [],
                childNode: null,
                conditionNodes: [],
                error: false,
              },
            ],
          },
        ],
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
