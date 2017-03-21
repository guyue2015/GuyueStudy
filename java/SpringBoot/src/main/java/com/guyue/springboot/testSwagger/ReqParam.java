package com.guyue.springboot.testSwagger;

import io.swagger.annotations.ApiModelProperty;

public class ReqParam {
	@ApiModelProperty(name="reqPropertyStr",notes="测试属性内容")
	private String reqPropertyStr;
	private int reqPropertyInt;
	@ApiModelProperty(name="reqPropertyObject",notes="测试隐藏属性内容",hidden=true)
	private Object reqPropertyObject;
	public String getReqPropertyStr() {
		return reqPropertyStr;
	}
	public void setReqPropertyStr(String reqPropertyStr) {
		this.reqPropertyStr = reqPropertyStr;
	}
	public int getReqPropertyInt() {
		return reqPropertyInt;
	}
	public void setReqPropertyInt(int reqPropertyInt) {
		this.reqPropertyInt = reqPropertyInt;
	}
	public Object getReqPropertyObject() {
		return reqPropertyObject;
	}
	public void setReqPropertyObject(Object reqPropertyObject) {
		this.reqPropertyObject = reqPropertyObject;
	}
}
