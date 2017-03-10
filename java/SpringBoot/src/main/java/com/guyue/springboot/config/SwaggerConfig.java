package com.guyue.springboot.config;
 
import static springfox.documentation.builders.PathSelectors.regex;

import org.springframework.boot.bind.RelaxedPropertyResolver;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.util.StopWatch;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
 
@Configuration
@EnableSwagger2//注意这里
@ComponentScan(basePackages = "com.guyue.springboot.controller")
public class SwaggerConfig extends WebMvcConfigurerAdapter
        implements EnvironmentAware {
    /**
     * 静态资源映射
     * 
     * @param registry
     *            静态资源注册器
     */
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");
        super.addResourceHandlers(registry);
    }
    
    @Override
    public void setEnvironment(Environment environment) {//这里是从配置文件里读相关的字段
        this.propertyResolver = new RelaxedPropertyResolver(environment,
                "swagger.");
    }
 
    @Bean
    public Docket swaggerSpringfoxDocket4KAD() {//最重要的就是这里，定义了/test/.*开头的rest接口都分在了test分组里，可以通过/v2/api-docs?group=test得到定义的json
        StopWatch watch = new StopWatch();
        watch.start();
        Docket swaggerSpringMvcPlugin = new Docket(DocumentationType.SWAGGER_2)
                .groupName("test")
                .apiInfo(apiInfo()).select().apis(RequestHandlerSelectors.any())
                .build();
        watch.stop();
        return swaggerSpringMvcPlugin;
    }
    
    private ApiInfo apiInfo() {//这里是生成文档基本信息的地方
        return new ApiInfo(propertyResolver.getProperty("title"),
                propertyResolver.getProperty("description"),
                propertyResolver.getProperty("version"),
                propertyResolver.getProperty("termsOfServiceUrl"),
                new Contact(propertyResolver.getProperty("contact.name"),
                        propertyResolver.getProperty("contact.url"),
                        propertyResolver.getProperty("contact.email")),
                propertyResolver.getProperty("license"),
                propertyResolver.getProperty("licenseUrl"));
    }
    private RelaxedPropertyResolver propertyResolver;
}