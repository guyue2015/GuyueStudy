formatter_dict = function(option,objValue){
     angular.forEach(dict[option], function(data){
          if (data.value == objValue) {
            objValue = data.text;
          }
    });
     return objValue;
  }
var dict = {
  "payroll_date": [
    {
      "value": "day_1",
      "text": "1日"
    },
    {
      "value": "day_2",
      "text": "2日"
    },
    {
      "value": "day_3",
      "text": "3日"
    },
    {
      "value": "day_4",
      "text": "4日"
    },
    {
      "value": "day_5",
      "text": "5日"
    },
    {
      "value": "day_6",
      "text": "6日"
    },
    {
      "value": "day_7",
      "text": "7日"
    },
    {
      "value": "day_8",
      "text": "8日"
    },
    {
      "value": "day_9",
      "text": "9日"
    },
    {
      "value": "day_10",
      "text": "10日"
    },
    {
      "value": "day_11",
      "text": "11日"
    },
    {
      "value": "day_12",
      "text": "12日"
    },
    {
      "value": "day_13",
      "text": "13日"
    },
    {
      "value": "day_14",
      "text": "14日"
    },
    {
      "value": "day_15",
      "text": "15日"
    },
    {
      "value": "day_16",
      "text": "16日"
    },
    {
      "value": "day_17",
      "text": "17日"
    },
    {
      "value": "day_18",
      "text": "18日"
    },
    {
      "value": "day_19",
      "text": "19日"
    },
    {
      "value": "day_20",
      "text": "20日"
    },
    {
      "value": "day_21",
      "text": "21日"
    },
    {
      "value": "day_22",
      "text": "22日"
    },
    {
      "value": "day_23",
      "text": "23日"
    },
    {
      "value": "day_24",
      "text": "24日"
    },
    {
      "value": "day_25",
      "text": "25日"
    },
    {
      "value": "day_26",
      "text": "26日"
    },
    {
      "value": "day_27",
      "text": "27日"
    },
    {
      "value": "day_28",
      "text": "28日"
    },
    {
      "value": "day_29",
      "text": "29日"
    },
    {
      "value": "day_30",
      "text": "30日"
    },
    {
      "value": "day_31",
      "text": "31日"
    }
  ],
  "occupation": [
    {
      "value": "occupation_1",
      "text": "负责人"
    },
    {
      "value": "occupation_2",
      "text": "高层管理人员"
    },
    {
      "value": "occupation_3",
      "text": "中层管理人员"
    },
    {
      "value": "occupation_4",
      "text": "正式员工"
    },
    {
      "value": "occupation_5",
      "text": "派遣员工"
    },
    {
      "value": "occupation_6",
      "text": "非正式员工"
    },
    {
      "value": "occupation_7",
      "text": "退休人员"
    },
    {
      "value": "occupation_8",
      "text": "其它"
    }
  ],
  "eniftype": [
    {
      "value": "TONG_DUN",
      "text": "同盾"
    },
    {
      "value": "ZHIDAO_CY",
      "text": "知道创宇"
    },
    {
      "value": "YIBAO_TC",
      "text": "易宝天创"
    },
    {
      "value": "TIAN_CHENG",
      "text": "甜橙"
    }
  ],
  "house_category": [
    {
      "value": "house_no",
      "text": "无房"
    },
    {
      "value": "house_business",
      "text": "商业按揭房"
    },
    {
      "value": "house_funds",
      "text": "公积金按揭购房"
    },
    {
      "value": "house_over",
      "text": "全款/已结清购房"
    },
    {
      "value": "house_build",
      "text": "自建房"
    }
  ],
  "borrowpurpose": [
    {
      "value": "consumption",
      "text": "消费"
    },
    {
      "value": "business",
      "text": "经营"
    }
  ],
  "refuse_reason": [
    {
      "value": "high_risk",
      "text": "高风险行业/职业/客户群"
    },
    {
      "value": "bad_credit",
      "text": "不良信用记录"
    },
    {
      "value": "falsity_information",
      "text": "提供虚假资料/疑欺诈申请"
    },
    {
      "value": "untruthfulness_information",
      "text": "信息不真实"
    },
    {
      "value": "negative_information",
      "text": "负面信息"
    },
    {
      "value": "refuse_information",
      "text": "不远透露资料/信息"
    },
    {
      "value": "falsity_company",
      "text": "工作单位未在工商网注册/吊销/注销"
    },
    {
      "value": "uncheck_information",
      "text": "信息无法核实"
    },
    {
      "value": "invalid_idcard",
      "text": "无效身份证明"
    },
    {
      "value": "counter_condition",
      "text": "外籍人士不合要求"
    },
    {
      "value": "not_self",
      "text": "非本人申请"
    },
    {
      "value": "reason_age",
      "text": "年龄不符要求"
    },
    {
      "value": "falsity_proof_earnings",
      "text": "无效收入证明"
    },
    {
      "value": "falsity_company_earnings",
      "text": "无效工作证明"
    },
    {
      "value": "falsity_house_earnings",
      "text": "无效房产证明"
    },
    {
      "value": "reason_proof",
      "text": "收入不符合最低要求"
    },
    {
      "value": "reason_experience",
      "text": "工龄不符合最低要求"
    },
    {
      "value": "reason_company_time",
      "text": "私营业务公司经营时间不符合要求"
    },
    {
      "value": "reason_live",
      "text": "工作居住城市/区域不符"
    },
    {
      "value": "reason_ability",
      "text": "偿债能力不足"
    },
    {
      "value": "no_job",
      "text": "已离职/无业"
    },
    {
      "value": "check_no_job",
      "text": "核实其有离职或迁移意向"
    },
    {
      "value": "Comprehensive_credit",
      "text": "无综合信用"
    },
    {
      "value": "Blacklist_customer",
      "text": "黑名单客户"
    },
    {
      "value": "unusual_income",
      "text": "异常的收入趋势"
    },
    {
      "value": "uncontact",
      "text": "无法联络申请人"
    },
    {
      "value": "uncontact_company",
      "text": "无法联络申请人公司"
    },
    {
      "value": "reason_timeout",
      "text": "补件超市"
    },
    {
      "value": "reason_other",
      "text": "其他"
    }
  ],
  "sex": [
    {
      "value": 0,
      "text": "未选"
    },
    {
      "value": 1,
      "text": "男"
    },
    {
      "value": 2,
      "text": "女"
    }
  ],
  "check_option": [
    {
      "value": "fail",
      "text": "退回"
    },
    {
      "value": "pass",
      "text": "通过"
    },
    {
      "value": "refuse",
      "text": "拒贷"
    }
  ],
  "emergency": [
    {
      "value": 0,
      "text": "否"
    },
    {
      "value": 1,
      "text": "是"
    }
  ],
  "industry": [
    {
      "value": "industry_1",
      "text": "科学、教育、文化"
    },
    {
      "value": "industry_2",
      "text": "医药、卫生、保健"
    },
    {
      "value": "industry_3",
      "text": "公共事业、生活服务"
    },
    {
      "value": "industry_4",
      "text": "餐饮、娱乐、购物、旅游"
    },
    {
      "value": "industry_5",
      "text": "网络营销"
    },
    {
      "value": "industry_6",
      "text": "居家生活用品"
    },
    {
      "value": "industry_7",
      "text": "服装、皮革、纺织"
    },
    {
      "value": "industry_8",
      "text": "文体休闲用品、礼品、工艺品"
    },
    {
      "value": "industry_9",
      "text": "商务服务、广告、物流"
    },
    {
      "value": "industry_10",
      "text": "印刷、包装、造纸"
    },
    {
      "value": "industry_11",
      "text": "金融、保险、贸易"
    },
    {
      "value": "industry_12",
      "text": "工程、建筑、房地产、装潢"
    },
    {
      "value": "industry_13",
      "text": "计算机、互联网、通讯、办公设备及用品"
    },
    {
      "value": "industry_14",
      "text": "电子、电工、电器"
    },
    {
      "value": "industry_15",
      "text": "机械、设备、仪器、仪表及专业用品"
    },
    {
      "value": "industry_16",
      "text": "金属、非金属材料及制品"
    },
    {
      "value": "industry_17",
      "text": "化工"
    },
    {
      "value": "industry_18",
      "text": "交通、能源、矿产、冶金冶炼"
    },
    {
      "value": "industry_19",
      "text": "粮油、食品、农林牧渔"
    },
    {
      "value": "industry_20",
      "text": "党政、国家机构"
    },
    {
      "value": "industry_21",
      "text": "社会团体"
    },
    {
      "value": "industry_22",
      "text": "其他"
    }
  ],
  "source": [
    {
      "value": "source_1",
      "text": "客户推荐"
    },
    {
      "value": "source_2",
      "text": "电话联系"
    },
    {
      "value": "source_3",
      "text": "网络营销"
    },
    {
      "value": "source_4",
      "text": "宣传单页"
    },
    {
      "value": "source_5",
      "text": "陌生拜访"
    },
    {
      "value": "source_6",
      "text": "小区推广"
    },
    {
      "value": "source_7",
      "text": "短信推广"
    },
    {
      "value": "source_8",
      "text": "其它"
    }
  ],
  "unit_property": [
    {
      "value": "Institution_cause",
      "text": "机关事业"
    },
    {
      "value": "own_company",
      "text": "国有企业"
    },
    {
      "value": "foreign_trade",
      "text": "外贸"
    },
    {
      "value": "joint_venture",
      "text": "合资"
    },
    {
      "value": "shareholding_system",
      "text": "股份制"
    },
    {
      "value": "privately_owned",
      "text": "私营"
    },
    {
      "value": "personality",
      "text": "个体"
    },
    {
      "value": "other",
      "text": "其他"
    }
  ],
  "relation": [
    {
      "value": "father",
      "text": "父亲"
    },
    {
      "value": "mother",
      "text": "母亲"
    },
    {
      "value": "spouse",
      "text": "配偶"
    },
    {
      "value": "child",
      "text": "子女"
    },
    {
      "value": "other_relative",
      "text": "其他亲属"
    },
    {
      "value": "friend",
      "text": "朋友"
    },
    {
      "value": "coworker",
      "text": "同事"
    },
    {
      "value": "others",
      "text": "其他"
    }
  ],
  "phone_check": [
    {
      "value": 0,
      "text": "正常"
    },
    {
      "value": 1,
      "text": "异常"
    },
    {
      "value": 2,
      "text": "虚假"
    }
  ],
  "apply_date": [
    {
      "value": 1,
      "text": "1个月"
    },
    {
      "value": 3,
      "text": "3个月"
    },
    {
      "value": 6,
      "text": "6个月"
    },
    {
      "value": 9,
      "text": "9个月"
    },
    {
      "value": 12,
      "text": "12个月"
    },
    {
      "value": 18,
      "text": "18个月"
    },
    {
      "value": 24,
      "text": "24个月"
    },
    {
      "value": 36,
      "text": "36个月"
    }
  ],
  "warningitem": [
    {
      "value": "YB_FAIL_WARNING",
      "text": "易宝失败件数报警"
    },
    {
      "value": "SYS_ERROR_WARNING",
      "text": "系统异常报警"
    }
  ],
  "relationship_type": [
    {
      "value": "family",
      "text": "家人"
    },
    {
      "value": "friend",
      "text": "朋友"
    },
    {
      "value": "relatives",
      "text": "亲戚"
    },
    {
      "value": "colleagues",
      "text": "同事"
    }
  ],
  "marriage": [
    {
      "value": "SPINSTERHOOD",
      "text": "未婚"
    },
    {
      "value": "MARRIED",
      "text": "已婚"
    },
    {
      "value": "DIVORCED",
      "text": "离异"
    },
    {
      "value": "WIDOWED",
      "text": "丧偶"
    },
    {
      "value": "REMARRY",
      "text": "再婚"
    },
    {
      "value": "REMARRY_FORMER",
      "text": "复婚"
    }
  ],
  "repaymodel": [
    {
      "value": 1,
      "text": "等额本息"
    },
    {
      "value": 2,
      "text": "等额本金"
    },
    {
      "value": 3,
      "text": "按月付息，到期付本"
    }
  ],
  "invalid": [
    {
      "value": 0,
      "text": "未认证"
    },
    {
      "value": 1,
      "text": "已认证"
    }
  ],
  "diploma": [
    {
      "value": "PRE_HIGH_SCHOOL",
      "text": "高中以下"
    },
    {
      "value": "HIGH_SCHOOL",
      "text": "高中／中专"
    },
    {
      "value": "JUNIOR_COLLEGE",
      "text": "大专"
    },
    {
      "value": "UNDER_GRADUATE",
      "text": "本科"
    },
    {
      "value": "POST_GRADUATE",
      "text": "研究生"
    }
  ],
  "koseki": [
    {
      "value": "local_city",
      "text": "本地城镇"
    },
    {
      "value": "local_village",
      "text": "本地农村"
    },
    {
      "value": "outside_city",
      "text": "外埠城镇"
    },
    {
      "value": "outside_village",
      "text": "外埠农村"
    }
  ],
  "haschildren": [
    {
      "value": "yes",
      "text": "有"
    },
    {
      "value": "no",
      "text": "无"
    }
  ]
};