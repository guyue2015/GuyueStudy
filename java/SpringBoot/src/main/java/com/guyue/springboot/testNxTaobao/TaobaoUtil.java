package com.guyue.springboot.testNxTaobao;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import com.guyue.common.util.FileUtil;

public class TaobaoUtil {
	public static List<String> titleFileNameList = new ArrayList<String>(); 
	/**
	 * 
	 * @param titleFileDirectory 标题文件目录
	 * @param titleFile 标题文件
	 * @param taobaoHelpFile 淘宝助手文件
	 * @param resultFilePath 生成文件目录
	 * @return 生成文件路径
	 */
	public static String createTaobaoFile(Path titleFileDirectory,
			Path titleFile, Path taobaoHelpFile, Path resultFilePath) {
		List<Path> titlesPaths = new ArrayList<Path>();
		FileUtil.getSubPathByEnd(titleFileDirectory, titlesPaths,"xls");
		System.out.println("标题栏内容是:"+titlesPaths);
		for(Path titlePath:titlesPaths){
			System.out.println(titlePath.getFileName());
		}
		return null;
	}

}
