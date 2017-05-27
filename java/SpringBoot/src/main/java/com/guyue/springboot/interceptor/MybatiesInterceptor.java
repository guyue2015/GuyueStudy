package com.creditpomelo.rc.mapi.interceptor;

import java.util.Properties;

import org.apache.ibatis.cache.CacheKey;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;

import com.creditpomelo.rc.mapi.config.separation.MybatiesInterceptor;
//增加拦截器
//sqlSessionFactoryBean.setPlugins(new Interceptor[]{new MybatiesInterceptor()});

@Intercepts(
	    {
	        @Signature(type = Executor.class, method = "query", args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class}),
	        @Signature(type = Executor.class, method = "query", args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class, CacheKey.class, BoundSql.class}),
	    })
public class MybatiesInterceptor implements Interceptor {
	
	private Logger logger = LoggerFactory.getLogger(MybatiesInterceptor.class);

	@Override
	public Object intercept(Invocation invocation) throws Throwable {
	    MappedStatement mappedStatement = (MappedStatement) invocation.getArgs()[0];  
        Object parameter = invocation.getArgs()[1];
        BoundSql boundSql = mappedStatement.getBoundSql(parameter);  
        String originalSql = boundSql.getSql().trim();
        Object parameterObject = boundSql.getParameterObject();
        logger.info("***********追加台账相关用户数据权限***********");
        logger.info("原sql是:{}",originalSql);
        
        Object obj = invocation.proceed();
        return obj;
	}

	@Override
	public Object plugin(Object arg0) {
		  return Plugin.wrap(arg0, this);
	}

	@Override
	public void setProperties(Properties arg0) {
		
	}

}
