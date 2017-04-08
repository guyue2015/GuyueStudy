package com.guyue.springboot.config;

import org.springframework.core.convert.converter.Converter;


public class StringToStringConverter  implements Converter<String,Integer>{

	@Override
	public Integer convert(String source) {
		if("null".equalsIgnoreCase((String)source)){
			return null;
		}
		return Integer.parseInt(source);
	}

}
