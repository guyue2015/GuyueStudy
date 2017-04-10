package com.guyue.springboot.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
		Map<String,Object> resultData = new HashMap<String, Object>();
		List<String> keys = new ArrayList<String>();
		List<String> values = new ArrayList<String>();
		logger.debug("获取加密字段");
		TreeMap<String, String> datas = TestOpenSourceOneComPany.getData(start,end);
		for(String key:datas.keySet()){
			keys.add(key);
			values.add(datas.get(key).substring(0,4).replaceAll("00", "").replaceAll("A", "9"));
		}
		resultData.put("keys", keys);
		resultData.put("values", values);
		result.setData(resultData);
		result.setCode(200);
		return result;
	}
}
