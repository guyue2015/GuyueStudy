package com.guyue.springboot.testValid;

import javax.validation.constraints.Min;

import org.hibernate.validator.constraints.Length;

public class ValidBean {
	@Min(value=100,message="id最低100")
	private int id;
	@Length(min=1,max=30,message="姓名在1-30之间")
	private String name;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
