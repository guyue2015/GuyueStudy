package com.creditpomelo.rc.mapi.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@PropertySource("classpath:userpermission.properties") 
@ConfigurationProperties(prefix = "user.permission")
public class UserPermissionConfig {
	public static List<Map<String,String>> permission = new ArrayList<Map<String,String>>();

	public static List<Map<String, String>> getPermission() {
		return permission;
	}

	public static void setPermission(List<Map<String, String>> permission) {
		UserPermissionConfig.permission = permission;
	}
}
