package com.guyue.springboot.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.guyue.springboot.testSwagger.ApiResult;
import com.guyue.springboot.testValid.ValidBean;
@RestController
public class TestValidController {
	/**
	 * 日志记录
	 */
	private Logger logger = LoggerFactory.getLogger(TestSwaggerConfig.class);
	
	@RequestMapping(path = "/test/valid/save", method = RequestMethod.POST)
	@Validated
	public ApiResult testSave(@RequestBody ValidBean validBean) {
		logger.debug("保存测试内容");
		return null;
	}
}
