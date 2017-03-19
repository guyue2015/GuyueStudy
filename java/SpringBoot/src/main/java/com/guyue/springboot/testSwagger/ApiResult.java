package com.guyue.springboot.testSwagger;

public class ApiResult {
private int code;
private String message;
private Object Data;
public int getCode() {
	return code;
}
public void setCode(int code) {
	this.code = code;
}
public String getMessage() {
	return message;
}
public void setMessage(String message) {
	this.message = message;
}
public Object getData() {
	return Data;
}
public void setData(Object data) {
	Data = data;
}
}
