package com.guyue.springboot.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.guyue.springboot.entity.Student;
import com.guyue.springboot.testSwagger.ApiResult;

@RestController
@RequestMapping("test")
public class TestParamController {
	@RequestMapping(value="/getBean",method = RequestMethod.GET)
	ApiResult get(Student student) {
		ApiResult result = new ApiResult();
		if(student==null){
			result.setData("get参数获取不正确");
			return result;
		}
		result.setData(student);
		return result;
	}
	@RequestMapping(value="/postBean",method = RequestMethod.POST)
	ApiResult postBean(@RequestBody Student student) {
		ApiResult result = new ApiResult();
		if(student==null){
			result.setData("post参数获取不正确");
			return result;
		}
		result.setData(student);
		return result;
	}
	@RequestMapping(value="/postJSONBean",method = RequestMethod.POST)
	ApiResult postJson(@RequestBody Student student) {
		ApiResult result = new ApiResult();
		if(student==null){
			result.setData("postjson参数获取不正确");
			return result;
		}
		result.setData(student);
		return result;
	}
}
