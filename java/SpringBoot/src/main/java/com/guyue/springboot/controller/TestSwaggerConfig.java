package com.guyue.springboot.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.guyue.springboot.testSwagger.ApiResult;
import com.guyue.springboot.testSwagger.ReqParam;
import com.guyue.springboot.testSwagger.TestBean;
@RestController
@Api(value="",description="该接口为测试swagger接口 内含 列表数据查询 、业务数据保存俩个接口")
public class TestSwaggerConfig {
	/**
	 * 日志记录
	 */
	private Logger logger = LoggerFactory.getLogger(TestSwaggerConfig.class);
	/**
	 * 列表查询
	  * @Title: getWsaggerList 
	  * @Description: 
	  * @param reqParam 参数内容 查询条件等
	  * @return
	 */
	@ApiOperation(value="接口简介",notes="该接口详细介绍")
	@ApiResponses({
		@ApiResponse(code=200,message="",response=TestBean.class,responseContainer="List"),
		@ApiResponse(code=400,message="错误信息")
	})
	
	@RequestMapping(path = "/test/swagger/list", method = RequestMethod.GET)
	public ApiResult getWsaggerList(@RequestBody ReqParam reqParam) {
		ApiResult result = new ApiResult();
		logger.debug("进入get");
		result.setCode(200);
		List<TestBean> testList = new ArrayList<TestBean>();
//		模拟查询
		for(int i=0;i<10;i++){
			TestBean testBean = new TestBean();
			testBean.setId(i);
			testBean.setTestName("测试名称="+i);
			testBean.setTestDesc("测试描述="+i);
			testList.add(testBean);
		}
		result.setData(testList);
		return result;
	}
	@ApiImplicitParams({
		@ApiImplicitParam(name="reqPropertyStr",value="测试属性字段",required=false,paramType="body",dataType="String"),
		@ApiImplicitParam(name="reqPropertyInt",value="测试属性字段",required=false,paramType="body",dataType="int")
	})
	@RequestMapping(path = "/test/swagger/save", method = RequestMethod.POST)
	public TestBean testSave(@RequestBody TestBean testBean) {
		logger.debug("保存测试内容");
		return testBean;
	}
}
