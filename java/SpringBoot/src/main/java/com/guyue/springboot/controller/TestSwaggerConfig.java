package com.guyue.springboot.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.guyue.springboot.entity.Student;
@RestController
public class TestSwaggerConfig {
	private Logger logger = LoggerFactory.getLogger(TestSwaggerConfig.class);
	@RequestMapping(path = "/test/get", method = RequestMethod.GET)
	public Map<String,Object> get(Integer producttype) {
		logger.debug("进入get");
		logger.debug(""+producttype);
		Student student = new Student("胡贺东",27);
		Map<String,Object> response = new HashMap<String,Object>();
		response.put("code", 200);
		response.put("data", student);
		return response;
	}
}
