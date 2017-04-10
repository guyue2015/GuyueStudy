package com.guyue.springboot.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.guyue.springboot.testEncry.TestOpenSourceOneComPany;
import com.guyue.springboot.testSwagger.ApiResult;

@RestController
@RequestMapping("/testEncry")
public class TestEncryController {
	/**
	 * 日志记录
	 */
	private Logger logger = LoggerFactory.getLogger(TestSwaggerConfig.class);
	
	@RequestMapping(path = "/getData", method = RequestMethod.GET)
	public ApiResult testSave(@RequestParam Integer start,@RequestParam Integer end) {
		ApiResult result = new ApiResult();
		logger.debug("获取加密字段");
		result.setData(TestOpenSourceOneComPany.getData(start,end));
		result.setCode(200);
		return result;
	}
}
