package com.guyue.springboot.config;

import org.springframework.core.convert.converter.Converter;

public class StringToIntegerConverter  implements Converter<String,String>{

	@Override
	public String convert(String source) {
		if(source instanceof String && "null".equalsIgnoreCase((String)source)){
			source = null;
		}
		return source;
	}

}
