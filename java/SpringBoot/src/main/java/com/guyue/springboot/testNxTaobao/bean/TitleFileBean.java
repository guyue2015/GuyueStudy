package com.guyue.springboot.testNxTaobao.bean;

import java.util.List;
import java.util.Map;

public class TitleFileBean implements Comparable<TitleFileBean>{
	String name;
	String code;
	Map<Integer,String> excelContextTemple;
	List<String> titles;
	Integer order;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public Map<Integer, String> getExcelContextTemple() {
		return excelContextTemple;
	}
	public void setExcelContextTemple(Map<Integer, String> excelContextTemple) {
		this.excelContextTemple = excelContextTemple;
	}
	public List<String> getTitles() {
		return titles;
	}
	public void setTitles(List<String> titles) {
		this.titles = titles;
	}
	public Integer getOrder() {
		return order;
	}
	public void setOrder(Integer order) {
		this.order = order;
	}
	@Override
	public int compareTo(TitleFileBean o) {
		return this.getOrder().compareTo(o.getOrder());
	}
	
}
