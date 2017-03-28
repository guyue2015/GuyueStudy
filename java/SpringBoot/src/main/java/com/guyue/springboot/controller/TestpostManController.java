package com.guyue.springboot.controller;

import io.swagger.annotations.Api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
@RestController
@Api(tags = "test post Man",description="供测试人员测试postman使用")
public class TestpostManController {
	private Logger logger = LoggerFactory.getLogger(TestpostManController.class);
	@RequestMapping(value="/list",method = RequestMethod.GET)
	Map<String,Object> index() {
		Map<String,Object> result = new HashMap<String, Object>();
		List<String> testList = new ArrayList<String>();
		for(int i=0;i<10;i++){
			testList.add("test"+i);
		}
		result.put("id", 1);
		result.put("code", 200);
		result.put("data", testList);
		result.put("test", "测试数据");
		return result;
	}
	@RequestMapping(value="/save",method = RequestMethod.POST)
	Map<String,Object> index(String name,String age) {
		Map<String,Object> result = new HashMap<String, Object>();
		logger.info("接收参数name={},age={}",name,age);
		if(StringUtils.isEmpty(name)||StringUtils.isEmpty(age)){
			result.put("code", 400);
			return result;
		}
		Random rc = new Random();
		result.put("id", rc.nextInt(100));
		result.put("code", 200);
		result.put("test", "测试数据");
		return result;
	}
	@RequestMapping(value="/saveJson",method = RequestMethod.POST)
	Map<String,Object> index(@RequestBody Map<String,Object> params) {
		Map<String,Object> result = new HashMap<String, Object>();
		logger.info("JSON接收参数name={},age={}",params.get("name"),params.get("age"));
		if(StringUtils.isEmpty(params.get("name"))||StringUtils.isEmpty(params.get("age"))){
			result.put("code", 400);
			return result;
		}
		Random rc = new Random();
		result.put("id", rc.nextInt(100));
		result.put("code", 200);
		result.put("test", "测试数据");
		return result;
	}
	@RequestMapping(value="/delete",method = RequestMethod.GET)
	Map<String,Object> index(Integer id) {
		Map<String,Object> result = new HashMap<String, Object>();
		logger.info("测试删除数据id={}",id);
		if(StringUtils.isEmpty(id)){
			result.put("code", 400);
			return result;
		}
		result.put("id", 1);
		result.put("code", 200);
		result.put("test", "测试数据");
		return result;
	}
}
