angular
  .module('app')
  .constant('$const', {
    status: {
      k0: '初始化',
      k1: '启用',
      k2: '停用'
    },
    optType: {
      'k10': '创建角色',
      'k11': '修改角色',
      'k12': '停用角色',
      'k13': '启用角色',
      'k14': '删除角色',
      'k20': '创建操作人',
      'k21': '修改操作人',
      'k22': '停用操作人',
      'k23': '启用操作人',
      'k24': '删除操作人',
      'k30': '创建审批流程',
      'k31': '修改审批流程',
      'k40': '创建客户',
      'k41': '停用客户',
      'k42': '删除客户',
      'k43': '添加客户银行卡',
      'k44': '删除客户银行卡',
      'k45': '启用用户',
      'k50': '修改公司银行卡'
    },
    optStatus: {
      'k-1': '撤回',
      'k': '全部',
      'k0': '未提交',
      'k1': '待审核',
      'k2': '已通过',
      'k3': '已拒绝'
    },
    optStatusAction: {
      'k1': '提交',
      'k2': '同意',
      'k3': '驳回'
    },
    processType: {
      contract: {value: 5, text: '签约'},
      collection: {value: 2, text: '代收'},
      payment: {value: 1, text: '代付'},
      'batch-collection': {value: 4, text: '批量代收'},
      'batch-payment': {value: 3, text: '批量代付'}
    },
    roleBusiType: {
      'delete': {value: 14, desc: '删除角色'}, // 删除
      enable: {value: 13, desc: '启用角色'}, // 启用
      disable: {value: 12, desc: '停用角色'} // 停用
    },
    operatorBusiType: {
      'delete': {value: 24, desc: '删除操作人'}, // 删除
      enable: {value: 23, desc: '启用操作人'}, // 启用
      disable: {value: 22, desc: '停用操作人'} // 停用
    },
    customerBusiType: {
      'delete': {value: 42, desc: '删除客户'}, // 删除
      enable: {value: 45, desc: '启用客户'}, // 启用
      disable: {value: 41, desc: '停用客户'}, // 停用
      remove :{value:44, desc: '删除客户银行卡'}
    }
  });
